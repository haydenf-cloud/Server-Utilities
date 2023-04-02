import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { Client, ISlashCommand } from "../../..";

export default new class HelpCommand implements ISlashCommand {
    data = new SlashCommandBuilder()
        .setName("help")
        .setDescription("You need help?")
    
    invoke = async ({ bot, interaction }: { bot: Client, interaction: ChatInputCommandInteraction }) => {
        console.log({ interaction });
    }
}