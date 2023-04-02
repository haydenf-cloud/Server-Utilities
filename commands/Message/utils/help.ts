import { ApplicationCommand, Message } from "discord.js";
import { Client, ICommand } from "../../..";
import MessageCommandBuilder from "../../../builders/MessageCommand";

export default new (class HelpCommand implements ICommand {
  data = new MessageCommandBuilder()
    .setName("help")
    .setSummary("You need help?")
    .setAliases([
      "commands",
      "cmds",
      "cmdss",
      "commandslist",
      "commands-list",
      "list-commands",
    ])
    .setCooldown(5000);

  invoke = async ({ bot, message }: { bot: Client; message: Message }) => {
    const commands = await message.guild!.commands?.fetch();
    if ( !commands ) 
      return await message.reply({
        content: ":x: No commands we're found.",
      });

    let mapped = commands.map((command: ApplicationCommand) => `</${command?.name}:${command.id}>`).join(', ');
    await message.reply({
      content: `> Here are my commands in the server:\n\n${mapped}`,
    })
  };
})();
