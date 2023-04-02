import { ActivityType, ClientEvents, Status } from "discord.js";
import { Client } from "../../..";
import IEvent from "../../event";

export default new (class ReadyHandler implements IEvent {
  on: keyof ClientEvents = "ready";

  invoke = (bot: Client) => {
    console.log("It's live!");

    bot.user?.setPresence({
        status: "invisible"
    })
  };
})();
