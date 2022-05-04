const mongo = require('../structures/mongo')

const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('send')
        .setDescription('Transfer $Tokens to a given account')
        .addStringOption(option =>
            option.setName('token')
                .setDescription('The $Token or $NEAR to be sent')
                .setRequired(true)
                .addChoice('Near', '$NEAR')
                .addChoice('Utopia', 'hack_token.testnet')
                .setRequired(true))
        .addNumberOption(option =>
            option.setName('amount')
                .setDescription('The amount of $Tokens to be sent')
                .setRequired(true))
        .addUserOption(option =>
            option.setName('address')
                .setDescription('The receiver account address')
                .setRequired(true)),


    async execute(interaction) {

        const amount = interaction.options.getNumber("amount");
        const address = interaction.options.getUser("address");
        const token = interaction.options.getString("token");
        const guild_id = interaction.member.guild.id;

        let token_name;

        if (token == 'hack_token.testnet') { token_name = 'Utopia' }
        else (token_name = 'Near')


        let walletDB = await mongo.getWallet(address.id, guild_id)


        let message;


        if (walletDB == null) {
            message = `Hey ${address}, ${interaction.user.username} is trying to send you ${amount} ${token_name}. Please, register your wallet using /setwallet `;
            await interaction.reply({
                content: message,
                ephemeral: false
            });

        } else {
            console.log(walletDB.near_wallet)
            message = ` click the link to authorize the transfer: https://peterthebot.com?token=${token}&amount=${amount}&receiver=${walletDB.near_wallet}`

            await interaction.reply({
                content: message,
                ephemeral: true
            });

        };

    }
};



