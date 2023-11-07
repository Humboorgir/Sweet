import type { Command } from "@/types";
import { EmbedBuilder, SlashCommandBuilder } from "discord.js";

const command = {
  data: new SlashCommandBuilder().setName("userinfo").setDescription("Responds with the user's account info"),
  execute(interaction) {
    const user = interaction.user;
    const member = interaction.guild!.members.cache.get(interaction.member!.user.id)!;
    const embed = new EmbedBuilder()
      .setColor(65535)
      .setAuthor({ name: user.displayName, iconURL: user.displayAvatarURL({ extension: "png" }) })
      .setTitle("Avatar Link")
      .setURL(user.displayAvatarURL({ extension: "png" }))
      .setThumbnail(user.displayAvatarURL({ extension: "png" }))
      .addFields(
        { name: `Display Name`, value: user.displayName, inline: true },
        { name: `Username`, value: user.tag, inline: true },
        { name: `User ID`, value: user.id, inline: true },
        { name: "Bot?", value: user.bot ? "Yes" : "No", inline: true },
        {
          name: "Joined server",
          value: new Date(member.joinedTimestamp!).toLocaleString(),
          inline: true,
        },
        { name: "Joined Discord", value: new Date(user.createdTimestamp).toLocaleString(), inline: true },
        { name: "Role Count", value: `${member.roles.cache.size - 1}`, inline: true }
      );

    interaction.channel?.send({ embeds: [embed] });
  },
} as Command;

export default command;
