import { Snowflake, User } from "discord.js";
import mongoose from "mongoose";
import { Action } from "./Action";

export interface InfractionDocument extends mongoose.Document {
    discordId: string;
    reason?: string;
    action?: Action;
    moderator?: Snowflake;
};

let SavedInfraction = mongoose.model<InfractionDocument>("Infraction", new mongoose.Schema({
    discordId: {
        unique: true,
        required: true,
        type: String
    },
    reason: {
        unique: true,
        required: true,
        type: String
    }, 
    moderator: {
        unique: true,
        required: true,
        type: String
    }
}))

export default SavedInfraction;