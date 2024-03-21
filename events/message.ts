import type { Message } from "discord.js";
import type { Event } from "@/types";

const event = {
  name: "messageCreate",
  async execute(message: Message, model) {
    if (message.author.bot) return;
    console.log(message.content);
    const sentences = [message.content];

    // @ts-ignore
    if (!client.model) return;
    // @ts-ignore
    client.model.classify(sentences).then((predictions: any) => {
      const toxicity = predictions.find((prediction: any) => prediction.label == "toxicity");
      if (toxicity.results[0].match) return message.reply("فحش نده بی ادب");
    });
  },
} as Event;

export default event;
