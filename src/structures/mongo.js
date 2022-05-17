walletSchema = require("../schemas/wallet")
feedbackSchema = require("../schemas/botFeedback")
helpSchema = require("../schemas/helpSchema")
guildSchema = require("../schemas/botGuild")



//save user feedback to DB
module.exports.addFeedback = async (user_id, guild_id, message) => {

    if (message != null) {

        var datetime = new Date();

        await new feedbackSchema({
            user_id,
            guild_id,
            message,
            datetime,
        }).save().catch(err => console.log(err));
    }

}



//Wallet DB functions

//Create/find Members Database
module.exports.addWallet = async function (user_id, near_wallet, guild_id) {

    let walletDB = await internalCheckWallet(user_id, guild_id)
    var datetime = new Date();

    //user has no wallet
    if (walletDB == null) {

        walletSave = new walletSchema({
            user_id,
            near_wallet,
            guild_id,
            datetime,
        })

        await walletSave.save().catch(err => console.log(err));

    } else { // user has wallet, overwrite
        walletDB.near_wallet = near_wallet;
        walletDB.save();
    };


};

async function internalCheckWallet(user_id, guild_id) {
    let wallet = await walletSchema.findOne({ user_id, guild_id }).exec();
    return wallet
};

module.exports.getWallet = async (user_id, guild_id) => {

    return await internalCheckWallet(user_id, guild_id)

};

// Help DB functions
module.exports.getHelp = async () => {
    return await internalHelp();
}

async function internalHelp() {
    let help = await helpSchema.findOne({}).exec();
    return help
};

//Guild DB functions
async function internalGetGuild(guild_id) {
    let guild = await guildSchema.findOne({ guild_id }).exec();
    return guild
}

module.exports.getGuild = async (guild_id) => {
    return await internalGetGuild(guild_id);
};

// let guild_tokens = {
//     name: 'near',
//     address: 'near.testnet',
//     burner: 'jack_daniel.testnet'
// }

async function setGuildToken(guild_id, guild_tokens) {

    let guild_in = await internalGetGuild(guild_id);
    date = new Date();

    if (guild_in == null) {

        guild = new guildSchema({
            guild_id,
            guild_tokens,
            date,
        })
        await guild.save().catch(err => console.log(err));
    }
    else {
        guild_in.guild_tokens.push(guild_tokens);
        await guild_in.save().catch(err => console.log(err));
    }

}


//setGuildToken('971869071807250442', guild_tokens).catch(err => console.log(err));


