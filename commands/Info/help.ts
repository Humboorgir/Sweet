import { Command } from "@/types";

const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

const command = {
  data: new SlashCommandBuilder().setName("help").setDescription("Displays a list of available commands"),
  execute(interaction) {
    const commands = interaction.client.commands;

    let description = "";

    let categories: any = [];

    commands.forEach((value, key) => {
      if (!categories.includes(value.category)) {
        description += `\n${value.category}\n`;
        categories = [...categories, value.category];
      }
      description += `\`/${key}\`  `;
    });

    const helpEmbed = new EmbedBuilder()
      .setColor("#0077f7")
      .setTitle("Here's a list of all the available commands")
      .setDescription(description)
      .setFooter({ text: "use /help [command] for detailed information" });

    interaction.reply({ embeds: [helpEmbed] });
  },
} as Command;

export default command;
