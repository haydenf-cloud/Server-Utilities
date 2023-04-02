import { Message } from "discord.js";
import { Client, ICommand } from "../../..";
import MessageCommandBuilder from "../../../builders/MessageCommand";

export default new class HelpCommand implements ICommand {
    data = new MessageCommandBuilder()
        .setName("help")
        .setSummary("You need help?")
        .setAliases(['commands', 'cmds', "cmdss", "commandslist", "commands-list", "list-commands"])
        .setCooldown(5000)

    invoke = async ({ bot, message }: { bot: Client, message: Message }) => {
        console.log({ message });
    }
}