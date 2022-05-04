const mongoose = require('mongoose');
require('dotenv').config()

//const wallet = require('../schemas/wallet')

module.exports = {
    name: 'ready',
    once: true,

    async execute(client, commands) {
        console.log(`Ready! Logged in as ${client.user.tag}`);


        await dbConnect().catch(err => console.log(err));

        console.log("Database Connected!");




    },
};


async function dbConnect() {
    await mongoose.connect(process.env.MONGO_URI, {
    });
}