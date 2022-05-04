const mongoose = require('mongoose')

module.exports = mongoose.model("botFeedback", new mongoose.Schema({

    user_id: { type: String },
    guild_id: { type: String },
    message: { type: String },
    datetime: { type: Date }

}), 'feedback');

