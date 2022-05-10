const mongoose = require('mongoose');
require('dotenv').config()

//const wallet = require('../schemas/wallet')

module.exports = {
    name: 'ready',
    once: true,

    async execute(client, commands) {
        console.log(`Ready! Logged in as ${client.user.tag}`);
        const Guilds = client.guilds.cache.map(guild => guild.id);
        console.log(Guilds);

        await dbConnect().catch(err => console.log(err));

        console.log("Database Connected!");

    },
};


async function dbConnect() {
    await mongoose.connect(process.env.MONGO_URI, {
    });
}