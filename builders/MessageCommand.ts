export interface MessageCommandData { name: string, summary?: string, aliases?: string[], duration?: number }

export default class MessageCommandBuilder {
    data: MessageCommandData;

    constructor (data: MessageCommandData) {
        this.data = data;
        return this;
    }

    setName(name: string) {
        if ( typeof name !== 'string' ) 
            throw "Command Name on setName() is not a string";
        this.data.name = name.toLowerCase();
        return this;
    }

    setSummary(summary: string) {
        if ( typeof summary !== 'string' ) 
            throw "Summary on setSummary() is not a string";
        this.data.summary = summary.toLowerCase();
        return this;
    }

    setAliases(aliases: string[]) {
        if ( !Array.isArray(aliases) ) 
            throw "Aliases on setAliases() is not a array/or string[]";

        this.data.aliases = aliases;
        return this;
    }

    setCooldown(duration: number) {
        if ( isNaN(duration) || typeof duration !== 'number' ) 
            throw "Duration on SetCooldown() number is not a number";
        this.data.duration = duration;
        return this;
    };
};