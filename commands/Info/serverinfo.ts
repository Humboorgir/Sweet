import type { Command } from "@/types";
import { SlashCommandBuilder, EmbedBuilder } from "discord.js";

const command = {
  data: new SlashCommandBuilder()
    .setName("serverinfo")
    .setDescription("Responds with the current server info"),
  execute(interaction) {
    const guild = interaction.guild!;
    const icon = guild.iconURL();
    const embed = new EmbedBuilder()
      .setAuthor({ name: guild.name, iconURL: icon || undefined })
      .setThumbnail(guild.banner ? guild.bannerURL() : icon)
      .addFields(
        { name: "Name:", value: guild.name, inline: true },
        { name: "Owner:", value: `<@${guild.ownerId}>`, inline: true },
        { name: "Member count:", value: String(guild.memberCount), inline: true },
        { name: "Role count:", value: String(guild.roles.cache.size - 1), inline: true },
        { name: "Emoji count:", value: String(guild.emojis.cache.size), inline: true },
        { name: "Sticker count:", value: String(guild.stickers.cache.size), inline: true },
        { name: "AFK time out:", value: `${guild.afkTimeout / 60} minutes`, inline: true },
        { name: "Text channels:", value: String(guild.channels.cache.size), inline: true },
        { name: "Created at:", value: new Date(guild.createdTimestamp).toLocaleString(), inline: true }
      )
      .setColor("#0077f7");
    return interaction.reply({ embeds: [embed] });
  },
} as Command;

export default command;
