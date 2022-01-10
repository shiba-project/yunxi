const { glob } = require("glob");
const { promisify } = require("util");
const { Client } = require("discord.js");
const mongoose = require("mongoose");

const globPromise = promisify(glob);

/**
 * @param {Client} client
 */
module.exports = async (client) => {
    const CommandFiles = await globPromise(`${process.cwd()}/Commands/**/*.js`);
    CommandFiles.map((value) => {
        const file = require(value);
        const splitted = value.split("/");
        const directory = splitted[splitted.length - 2];

        if (file.name) {
            const properties = { directory, ...file };
            client.commands.set(file.name, properties);
        }
    });

    // Events
    const EventFiles = await globPromise(`${process.cwd()}/Events/*.js`);
    EventFiles.map((value) => require(value));

    // Slash Commands
    const SlashCommands = await globPromise(
        `${process.cwd()}/Slash/*/*.js`
    );

    const ArrayOfSlashCommands = [];
    SlashCommands.map((value) => {
        const file = require(value);
        if (!file?.name) return;
        client.SlashCommands.set(file.name, file);

        if (["MESSAGE", "USER"].includes(file.type)) delete file.description;
        ArrayOfSlashCommands.push(file);
    });
    client.on("ready", async () => {
        // await client.guilds.cache
        //    .get("replace this with your guild id")
        //    .commands.set(arrayOfSlashCommands);

        await client.application.commands.set(ArrayOfSlashCommands);
    });

    // mongoose
    const { mongooseConnectionString } = require('../config')
    if (!mongooseConnectionString) return;

    mongoose.connect(mongooseConnectionString).then(() => console.log('Connected to mongodb'));
};
