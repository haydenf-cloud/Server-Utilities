import { ApplicationCommand, ApplicationCommandData, ApplicationCommandDataResolvable, ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { Client, ISlashCommand } from "../../..";

export default new (class HelpCommand implements ISlashCommand {
  data = {
    name: "help",
    description: "You need help?",
    dmPermission: true
  } as ApplicationCommandData;

  invoke = async ({
    bot,
    interaction,
  }: {
    bot: Client;
    interaction: ChatInputCommandInteraction;
  }) => {
    const commands = await interaction.guild!.commands?.fetch();
    if ( !commands ) 
      return await interaction.followUp({
        content: ":x: No commands we're found.",
        ephemeral: true 
      });

    let mapped = commands.map((command: ApplicationCommand) => `</${command?.name}:${command.id}>`).join(', ');
    await interaction.followUp({
      content: `> Here are my commands in the server:\n\n${mapped}`,
      ephemeral: true
    })
  };
})();
