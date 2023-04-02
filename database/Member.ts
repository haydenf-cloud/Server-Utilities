import { Snowflake, User } from "discord.js";
import mongoose from "mongoose";

export interface MemberDocument extends mongoose.Document {
    discordId: string;
    likes?: Snowflake[];
    dislikes?: Snowflake[];
};

let SavedMember = mongoose.model<MemberDocument>("User", new mongoose.Schema({
    discordId: {
        unique: true,
        required: true,
        type: String
    },
    likes: {
        unique: true,
        required: false,
        type: [String],
        default: []
    },
    dislikes: {
        unique: true,
        required: false,
        type: [String],
        default: []
    },
}))

export default SavedMember;