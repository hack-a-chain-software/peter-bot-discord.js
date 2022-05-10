const fs = require('node:fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, BOT_TOKEN } = require('./config.json');



const commands = [];
const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));


for (const file of commandFiles) {
    const command = require(`./src/commands/${file}`);
    //console.log('choices:')
    // console.log(command.data.options.R.choices)
    commands.push(command.data.toJSON());
    //console.log(commands.options)
}

const rest = new REST({ version: '9' }).setToken(BOT_TOKEN);

// rest.get(Routes.applicationCommands(clientId, guildId))
//     .then(data => {
//         const promises = [];
//         for (const command of data) {
//             const deleteUrl = `${Routes.applicationCommands(clientId, guildId)}/${command.id}`;
//             promises.push(rest.delete(deleteUrl));
//         }
//         return Promise.all(promises);
//     });

// console.log('delete commands');

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(

            //To deploy global commands, adjust the route in the script to .applicationCommands(clientId).

            Routes.applicationCommands(clientId),
            //Routes.applicationGuildCommands(clientId, guildId),
            { body: commands },
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();



