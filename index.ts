import dotenv from "dotenv";
dotenv.config();

import Discord from "discord.js";
import MessageCommandBuilder from "./builders/MessageCommand";
import mongoose from "mongoose";

export interface ICommand {
  data: MessageCommandBuilder;
  invoke: (...args: any[]) => Promise<any> | void;
}

export interface ISlashCommand {
  data: Discord.SlashCommandBuilder | Discord.ApplicationCommandDataResolvable;
  invoke: (...args: any[]) => Promise<any> | void;
}

export class Client extends Discord.Client {
  constructor() {
    super({
      intents: [
        Discord.GatewayIntentBits.Guilds,
        Discord.GatewayIntentBits.GuildMessages,
        Discord.GatewayIntentBits.MessageContent,
      ],
    });

    return this;
  }
}

export const bot = new Client();

["commands.handler", "events.handler"].forEach(async (file) => {
    let handler = (await import(`./handlers/${file}`))?.default;
    new handler().init(bot);
});

mongoose.connect(process.env["MONGO_URI"] as string, {})
  .then(() => console.log("Mongoose Has Successfully Connected"))
  .catch(console.error);

bot.login(process.env["BOT_TOKEN"]);
