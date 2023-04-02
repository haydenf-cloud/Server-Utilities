import { ChatInputCommandInteraction, ContextMenuCommandInteraction, Message } from "discord.js";
import fs from "fs";
import { bot, Client, ICommand } from "..";

export default class {
    constructor () {
        bot.on('messageCreate', 
            async (message: Message) => {
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
            const commands = fs.readdirSync(`./commands/Message/${dir}`).filter(file => file.endsWith('.js'));
    
            for ( const command of commands ) {
                const pull = (await import(`../commands/Message/${dir}/${command}`))?.default;
                if ( !pull?.data || !pull?.data?.name ) return;
    
                bot.commands.set(pull.data.name, pull);
                if ( pull.data?.aliases && Array.isArray(pull.data.aliases) )
                    pull.data.aliases.forEach((alias: string) => bot.aliases.set(alias, pull.data.name));
            };
        });
    
        fs.readdirSync("./commands/Slash").forEach(async dir => {
            const commands = fs.readdirSync(`./commands/Slash/${dir}`).filter(file => file.endsWith('.js'));
    
            for ( const command of commands ) {
                const pull = (await import(`../commands/Slash/${dir}/${command}`))?.default;
                if ( !pull?.data || !pull?.data?.name ) return;
    
                bot.slashCommands.set(pull.data.name, pull);
                bot.ApplicationCommands.push(pull.data);
            };
        })
    }

    private async handleCommand(options: { interaction?: ChatInputCommandInteraction | ContextMenuCommandInteraction, message?: Message }) {
        var { message, interaction } = options;
        if ( interaction ) {
            var { commandName, guild, user, member, deferred } = interaction;
            var command = bot.slashCommands.get(commandName);
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

            let command = bot.commands.get(cmd as string) as ICommand;
            if (!command) return;

            await command.invoke({ bot, message, command, guild, author, member });
        };
   } 
}