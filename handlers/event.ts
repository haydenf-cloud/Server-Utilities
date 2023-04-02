import { ClientEvents } from "discord.js";

export default interface IEvent {
  on: keyof ClientEvents;
  once?: boolean;
  invoke: (...args: any[]) => Promise<any> | void;
}
