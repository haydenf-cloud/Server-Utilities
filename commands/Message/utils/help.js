import MessageCommandBuilder from "../../../builders/MessageCommand";

export default {
    data: new MessageCommandBuilder()
        .setName("help")
        .setDescription("You need help?")
        .setAliases(['commands', 'cmds', 'halp', 'HeLP']),

    invoke: async ({ bot, message }) => {
        console.log({ message });
    }
}