import type { Collection, CommandInteraction, SlashCommandBuilder, Client } from "discord.js";

export interface Command {
  data: SlashCommandBuilder;
  execute: (interaction: CommandInteraction) => void;
}
export interface Event {
  name: string;
  execute: (...args: any) => void;
}

declare module "discord.js" {
  export interface Client {
    commands: Collection<string, { category: string; module: Command }>;
  }
}

declare global {
  var client: Client;
}
