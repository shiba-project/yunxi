const { Command } = require("reconlx");

module.exports = new Command({
    name: "ping",
    description: "returns websocket ping",
    aliases: ['p'],

    run: async ({client, message, args}) => {
        message.channel.send(`${client.ws.ping} ws ping`);
    },
});