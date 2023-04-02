import { ApplicationCommand, ApplicationCommandData, ApplicationCommandDataResolvable, ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { Client, ISlashCommand } from "../../..";

export default new (class PingCommand implements ISlashCommand {
  data = {
    name: "ping",
    description: "Who's Pinging Me?",
    dmPermission: true
  } as ApplicationCommandData;

  invoke = async ({
    bot,
    interaction,
  }: {
    bot: Client;
    interaction: ChatInputCommandInteraction;
  }) => {    
    await interaction.followUp({
      content: `> Pong! \`${bot.ws.ping}ms\``,
      ephemeral: true
    })
  };
})();
