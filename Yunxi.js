const { Client, Collection } = require("discord.js");

const client = new Client({
    intents: 32767,
});
module.exports = client;

client.commands = new Collection();
client.SlashCommands = new Collection();
client.config = require("./Config");

require("./Handler")(client);

client.login(client.config.token);