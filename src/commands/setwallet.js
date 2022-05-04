const { SlashCommandBuilder } = require('@discordjs/builders');
const mongo = require('../structures/mongo')

module.exports = {

    data: new SlashCommandBuilder()
        .setName('setwallet')
        .setDescription('Set your near wallet (warning: required to receive tokens )')
        .addStringOption(option =>
            option.setName('wallet')
                .setDescription('Your near wallet  eg. peter.near')
                .setRequired(true)),


    async execute(interaction) {

        const near_wallet = interaction.options.getString("wallet")
        const username = interaction.user.username
        const user_id = interaction.user.id
        const guild_id = interaction.member.guild.id

        await mongo.addWallet(user_id, near_wallet, guild_id)


        await interaction.reply({
            content: `Hey ${username}, your wallet: ${near_wallet} is set;`, //Your wallet was set - to change your wallet, just use this command again
            ephemeral: true
        });
    }
};



