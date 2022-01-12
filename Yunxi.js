const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Yunxi is Listening at http://localhost:${port}`));

// -------------------------------------------------------------

const { Client, Collection } = require("discord.js");

const client = new Client({
  intents: 32767
});
module.exports = client;

client.commands = new Collection();
client.SlashCommands = new Collection();
client.config = require("./Config.json");

client.login(process.env.token).catch(console.error);