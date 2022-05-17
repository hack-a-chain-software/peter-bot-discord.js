const mongoose = require('mongoose')

module.exports = mongoose.model("botGuilds", new mongoose.Schema({

    guild_id: { type: String },
    guild_tokens:
        [
            {
                name: String,
                address: String,
                burner: String
            }
        ],
    date: { type: Date, default: Date.now }

}), 'guilds');

