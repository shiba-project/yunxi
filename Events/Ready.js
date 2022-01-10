const client = require("../Yunxi");

client.on("ready", () =>
    console.log(`${client.user.tag} is up and ready to go!`)
);
