import Discord from "discord.js";
import fs from "fs";
import { Client } from "..";

export default class {
    constructor () {}

    public async init (bot: Client) {
        fs.readdirSync(`./handlers/events`).forEach(async dir => {
            const files = fs.readdirSync(`./handlers/events/${dir}`).filter(file => file.endsWith('.js'));
    
            for ( const file of files ) {
                const event = (await import (`./events/${dir}/${file}`))?.default;
                if ( !event?.on ) return;
    
                event.once ? 
                    bot.on(event?.on, event.invoke.bind(event)) : 
                    bot.once(event?.on, event.invoke.bind(event));
            };
        });
    }
}