import type { Command } from "@/types";
import { SlashCommandBuilder, EmbedBuilder } from "discord.js";

const command = {
  data: new SlashCommandBuilder()
    .setName("membercount")
    .setDescription("Responds with the server's membercount"),
  execute(interaction) {
    const members = interaction.guild!.members.cache;
    const onlineMembers = members.filter((m) => m.presence?.status == "online" && !m.user.bot);
    const dndMembers = members.filter((m) => m.presence?.status == "dnd" && !m.user.bot);
    const idleMembers = members.filter((m) => m.presence?.status == "idle" && !m.user.bot);
    const offlineMembers = members.filter(
      (m) => (m.presence?.status == "offline" || m.presence == null) && !m.user.bot
    );
    const bots = members.filter((m) => m.user.bot);
    const embed = new EmbedBuilder()
      .setColor(65535)
      .setTitle("Member count")
      .addFields(
        { name: "Total", value: String(members.size), inline: true },
        { name: "Online", value: String(onlineMembers.size), inline: true },
        { name: "Do Not Disturb", value: String(dndMembers.size), inline: true },
        { name: "Idle", value: String(idleMembers.size), inline: true },
        { name: "Offline", value: String(offlineMembers.size), inline: true },
        { name: "Bots", value: String(bots.size), inline: true }
      );
    interaction.reply({ embeds: [embed] });
  },
} as Command;

export default command;
