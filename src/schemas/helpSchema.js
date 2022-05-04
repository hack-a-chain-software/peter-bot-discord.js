const mongoose = require('mongoose')

module.exports = mongoose.model("help", new mongoose.Schema({
    message: { type: String },
}), 'help');
