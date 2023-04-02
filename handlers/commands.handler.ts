import { ChatInputCommandInteraction, ContextMenuCommandInteraction, Message, REST, Routes } from "discord.js";
import fs from "fs";
import { bot, Client, ICommand, ISlashCommand } from "..";
import Discord from "discord.js";
import SavedMember, { MemberDocument } from "../database/Member";

export default class {
    private REST = new REST({ version: "10" }).setToken(bot.token as string);
    slashCommands: Array<ISlashCommand> = [];
    ApplicationCommands: Array<Discord.ApplicationCommandDataResolvable> = [];
    commands: Array<ICommand> = [];
    aliases: Discord.Collection<string, string> = new Discord.Collection();


    constructor () {
        bot.on('messageCreate', 
            async (message: Message) => {
                if ( !message.author.bot ) {
                    let savedMember = SavedMember.findOne({ discordId: message.author.id }) ||
                        await SavedMember.create({ discordId:  message.author.id });
                };
                await this.handleCommand({ message })
            });
        bot.on('interactionCreate', 
            async (interaction: any) => {
                await this.handleCommand({ interaction })
            });
        return this;
    }

    public async init (bot: Client) {
        fs.readdirSync("./commands/Message").forEach(async dir => {
            const commands = fs.readdirSync(`./commands/Message/${dir}`).filter(file => file.endsWith('.ts'));
    
            for ( const command of commands ) {
                const pull = (await import(`../commands/Message/${dir}/${command}`))?.default as ICommand;
                if ( !pull?.data || !pull?.data?.name ) return;

                this.commands.push(pull);
                if ( pull.data?.aliases && Array.isArray(pull.data.aliases) )
                    pull.data.aliases.forEach((alias: string) => this.aliases.set(alias, pull.data.name));
            };
        });
    
        fs.readdirSync("./commands/Slash").forEach(async dir => {
            const commands = fs.readdirSync(`./commands/Slash/${dir}`).filter(file => file.endsWith('.ts'));
    
            for ( const command of commands ) {
                const pull = (await import(`../commands/Slash/${dir}/${command}`))?.default;
                if ( !pull?.data || !pull?.data?.name ) return;
    
                this.slashCommands.push(pull);
                this.ApplicationCommands.push(pull.data);
            };
        });

        bot.on('ready', async () => {
            await this.REST.put(Routes.applicationGuildCommands(bot.user!.id as string, "850132910865645609"), {
                body: this.ApplicationCommands
            })
                .then(() => console.log('Successfully registered application commands.'))
                .catch(console.error)
        }) 
    }

    private async handleCommand(options: { interaction?: ChatInputCommandInteraction | ContextMenuCommandInteraction, message?: Message }) {
        var { message, interaction } = options;
        try {
            if ( interaction ) {
                var { commandName, guild, user, member, deferred } = interaction;
                var command = this.slashCommands.find((cmd: any) => cmd.data.name === commandName);
                if ( !deferred ) 
                    await interaction.deferReply({ ephemeral: false }).catch(() => {});
                if ( !command ) 
                    return await interaction.followUp({ content: "Invaild Command" });
                
                await command.invoke({ bot, interaction, command, guild, user });
            } else if ( message ) {
                if ( message.author.bot || !message.content.startsWith('.') ) return;
                let { author, guild, member } = message;
    
                let prefix = "."
                const args = message.content.slice(prefix.length).trim().split(/ + /g);
                let cmd = args.shift()?.toLowerCase();
    
                let command = this.commands.find((c: any) => c.data.name === cmd) as ICommand;
                if (!command) return;
    
                await command.invoke({ bot, message, command, guild, author, member });
            };
        } catch(err: any) {
            console.error(err.stack);
        } 
   } 
}