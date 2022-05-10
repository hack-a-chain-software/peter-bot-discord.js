
const Client = require('./src/structures/Client')
const { Collection, Intents } = require('discord.js');


const config = require("./config.json");
const fs = require('node:fs');


const client = new Client({
    intents: [Intents.FLAGS.GUILDS]

}

);

const commands = [];
client.commands = new Collection();

const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));
const eventFiles = fs.readdirSync('./src/events').filter(file => file.endsWith('.js'));

// getting the commands from the command file
for (const file of commandFiles) {
    const command = require(`./src/commands/${file}`);


    commands.push(command.data.toJSON());
    client.commands.set(command.data.name, command);

}



//getting the events 
for (const file of eventFiles) {
    const event = require(`./src/events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, commands));
    } else {
        client.on(event.name, (...args) => event.execute(...args, commands));
    }
}


client.login(config.BOT_TOKEN);


