import { config } from "dotenv";
config();

require("@tensorflow/tfjs");
const toxicity = require("@tensorflow-models/toxicity");

import { Client, Collection, GatewayIntentBits } from "discord.js";
import mongoConnect from "@/lib/mongoConnect";
import * as path from "path";
import * as fs from "fs";
const { Guilds, GuildMessages, GuildPresences, MessageContent, GuildMembers } = GatewayIntentBits;

const client = new Client({
  intents: [Guilds, GuildMessages, GuildMembers, GuildPresences, MessageContent],
});
global.client = client;

const threshold = 0.9;
toxicity.load(threshold).then((model: any) => {
  console.log("model loaded");
  // @ts-ignore
  client.model = model;
});

const { DISCORD_TOKEN } = process.env;

client.commands = new Collection();

LoadEventHandler();

LoadCommandHandler();

mongoConnect();

// Event handler
async function LoadEventHandler() {
  const eventsPath = path.join(__dirname, "events");
  const eventFiles = fs
    .readdirSync(eventsPath)
    .filter((file) => file.endsWith(".js") || file.endsWith(".ts"));

  for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const { default: event } = await import(filePath);
    console.log(`Loading event: ${event.name}`);
    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args));
    } else {
      client.on(event.name, (...args) => event.execute(...args));
    }
  }
}

// Command handler
async function LoadCommandHandler() {
  const foldersPath = path.join(__dirname, "commands");
  const commandFolders = fs.readdirSync(foldersPath);
  for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs
      .readdirSync(commandsPath)
      .filter((file) => file.endsWith(".js") || file.endsWith(".ts"));

    for (const file of commandFiles) {
      const filePath = path.join(commandsPath, file);
      const { default: command } = await import(filePath);
      if (!command.data || !command.execute) {
        console.log(command.data);
        console.log(`The command at ${filePath} is missing a required 'data' or 'execute' property.`);
        continue;
      }
      console.log(`Loading command: ${command.data.name}`);
      client.commands.set(command.data.name, { category: folder, module: command });
    }
  }
}

client.login(DISCORD_TOKEN);
