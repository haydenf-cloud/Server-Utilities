import Discord from "discord.js";
import fs from "fs";
import { Client } from "..";
import IEvent from "./event";

export default class {
  constructor() {}

  public async init(bot: Client) {
    fs.readdirSync(`./handlers/events`).forEach(async (dir) => {
      const files = fs
        .readdirSync(`./handlers/events/${dir}`)
        .filter((file) => file.endsWith(".ts"));
 
      for (const file of files) {
        const event = (await import(`./events/${dir}/${file}`))
            ?.default as IEvent;
        if (!event?.on) return;

        bot.on(event?.on as any, event.invoke.bind(event));
      }
    });
  }
}
