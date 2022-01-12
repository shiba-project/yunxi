const { Command } = require("reconlx");

module.exports = new Command({
    name: "ping",
    description: "returns websocket ping",
    aliases: ['p'],

    run: async ({client, message, args}) => {
        message.reply(`${client.ws.ping} ws ping`);
    },
});