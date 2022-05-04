const mongoose = require('mongoose')

module.exports = mongoose.model("wallet", new mongoose.Schema({

  user_id: { type: String },
  near_wallet: { type: String },
  guild_id: { type: String },
  datetime: { type: Date }

}), 'wallet');

