import type { Event } from "@/types";
import type { GuildMember, TextChannel } from "discord.js";
import serverModel from "@/models/server";

const event = {
  name: "guildMemberAdd",
  async execute(member: GuildMember) {
    const serverDocument = await serverModel.findOne({
      id: member.guild.id,
    });

    if (!serverDocument || !serverDocument.settings?.welcome?.enabled) return;

    const welcomeChannel = member.guild.channels.cache.find(
      (channel) => channel.id == serverDocument.settings?.welcome?.channelId
    );
    if (!welcomeChannel) return;

    if (!welcomeChannel.isTextBased)
      return console.log(
        `[WARNING]: welomeChannel ${welcomeChannel.name} with the ID ${welcomeChannel.id} 
        in ${member.guild.name} with the ID ${member.guild.id} is NOT a text based channel.`
      );

    return (welcomeChannel as TextChannel).send(serverDocument.settings.welcome.message);
  },
} as Event;

export default event;
