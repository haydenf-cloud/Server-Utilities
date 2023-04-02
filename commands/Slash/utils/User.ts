import { ApplicationCommand, ApplicationCommandData, ApplicationCommandDataResolvable, ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { Client, ISlashCommand } from "../../..";
import SavedMember from "../../../database/Member";

export default new (class MemberCommand implements ISlashCommand {
  data = {
    name: "user",
    description: "Are you privacy breaching someone?",
    dmPermission: true,
    options: [
        {
            name: "member",
            type: 6,
            description: "Nowww, are you privacy breaching someone'?",
            required: false,
        }
    ]
  } as ApplicationCommandData;

  invoke = async ({
    bot,
    interaction,
  }: {
    bot: Client;
    interaction: ChatInputCommandInteraction;
  }) => {    
    let member = interaction.guild?.members.cache.get(interaction.options.getUser('member', false)?.id)
        || interaction.member;
    // let savedMember = await SavedMember.findOne({ discordId: member?.id }) ??
    //    await SavedMember.create({ discordId: member?.id });
    
    await interaction.followUp({
        content: `> :rocket: Coming Soon!`,
    })
  };
})();
