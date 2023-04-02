export interface MessageCommandData {
  name?: string;
  summary?: string;
  aliases?: string[];
  duration?: number;
}

export default class MessageCommandBuilder {
  [x: string]: any;
  data: MessageCommandData;

  constructor() {
    this.data = {};
    return this;
  }

  setName(name: string): this {
    if (typeof name !== "string")
      throw "Command Name on setName() is not a string";
    this.data.name = name.toLowerCase();
    return this;
  }

  setSummary(summary: string): this {
    if (typeof summary !== "string")
      throw "Summary on setSummary() is not a string";
    this.data.summary = summary.toLowerCase();
    return this;
  }

  setAliases(aliases: string[]): this {
    if (!Array.isArray(aliases))
      throw "Aliases on setAliases() is not a array/or string[]";

    this.data.aliases = aliases;
    return this;
  }

  setCooldown(duration: number): this {
    if (isNaN(duration) || typeof duration !== "number")
      throw "Duration on SetCooldown() number is not a number";
    this.data.duration = duration;
    return this;
  }
}
