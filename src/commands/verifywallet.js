const { SlashCommandBuilder } = require('@discordjs/builders');
const mongo = require('../structures/mongo')

module.exports = {

    data: new SlashCommandBuilder()
        .setName('verifywallet')
        .setDescription('Check the wallet that is saved'),


    async execute(interaction) {

        const username = interaction.user.username
        const user_id = interaction.user.id
        const guild_id = interaction.member.guild.id

        let walletDB = await mongo.getWallet(user_id, guild_id)

        let message;

        if (walletDB == null) {
            message = 'There is no wallet registred - please use /setwallet to save your wallet';
        } else {
            message = `Hey you ${username}, your wallet is ${walletDB.near_wallet}  `
        };


        await interaction.reply({
            content: message,
            ephemeral: true
        });
    }
};



