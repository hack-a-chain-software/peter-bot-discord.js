walletSchema = require("../schemas/wallet")
feedbackSchema = require("../schemas/botFeedback")
helpSchema = require("../schemas/helpSchema")

//Create/find Members Database
module.exports.addWallet = async function (user_id, near_wallet, guild_id) {

    let walletDB = await internalCheckWallet(user_id, guild_id)

    var datetime = new Date();


    if (walletDB == null) {

        walletSave = new walletSchema({
            user_id,
            near_wallet,
            guild_id,
            datetime,
        })


        await walletSave.save().catch(err => console.log(err));


    } else {

        walletDB.near_wallet = near_wallet;
        walletDB.save();


    };


};

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




async function internalCheckWallet(user_id, guild_id) {
    let Wallet = await walletSchema.findOne({ user_id, guild_id }).exec();
    return Wallet
};

module.exports.getWallet = async (user_id, guild_id) => {

    return await internalCheckWallet(user_id, guild_id)

};

module.exports.getHelp = async () => {
    return await internalHelp();
}

async function internalHelp() {
    let help = await helpSchema.findOne({}).exec();
    return help
};