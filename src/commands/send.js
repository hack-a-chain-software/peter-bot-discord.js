const { SlashCommandBuilder } = require('@discordjs/builders');
const mongo = require('../structures/mongo')
const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('send')
        .setDescription('Transfer tokens to your friends')
        .addStringOption((option) =>
            option
                .setName('token')
                .setDescription('Select your token from the list')
                .setRequired(true)
                .setAutocomplete(true))
        .addNumberOption(option =>
            option.setName('amount')
                .setDescription('The amount of Tokens to be sent')
                .setRequired(true))
        .addUserOption(option =>
            option.setName('address')
                .setDescription('The receiving user (wallet must be saved)')
                .setRequired(true)),

    async execute(interaction) {

        const guildID = interaction.member.guild.id;

        let guild = await mongo.getGuild(guildID)
        let choices = [];
        let tokens = [];
        let ephemeral = true;
        let row = null;

        //loop through guild token and set to autocomplete 

        for (let i = 0; i < guild.guild_tokens.length; i++) {
            choices.push({
                name: `${guild.guild_tokens[i].name}`,
                value: `${i}`,
            })
            tokens.push(`${guild.guild_tokens[i].name}`)
        }

        if (interaction.isAutocomplete()) {
            interaction.respond(choices)
                .catch(console.error);
        }

        // Must handle interactions (command ones) inside the if statement
        if (interaction.isCommand()) {

            const amount = interaction.options.getNumber("amount");
            const address = interaction.options.getUser("address");
            let tokenIndex = interaction.options.getString("token");

            let tokenName, burnWallet, tokenAddress;
            let msg = '';
            let tokenAvalible = true;

            let walletDB = await mongo.getWallet(address.id, guildID)

            // handling tokens that are not listed
            try {
                tokenName = guild.guild_tokens[tokenIndex].name;
                burnWallet = guild.guild_tokens[tokenIndex].burner;
                tokenAddress = guild.guild_tokens[tokenIndex].address;
            }
            catch (e) {
                console.log('Erro')
                tokenAvalible = false;
            }


            //await interaction.deferReply();
            // handling the input
            if (!tokenAvalible) { // token not listed

                for (i = 0; i < tokens.length; i++) {

                    if (i < (tokens.length - 1)) { msg = `${msg} ${tokens[i]},` } // last token doesnt need comma
                    else { msg = `${msg} ${tokens[i]}` }

                }

                msg = `That token is unavalible. Please, pick one of the tokens listed on this server: ${msg}`
                ephemeral = true;


            } else if (walletDB == null) { // token listed, but receiver wallet not connected
                msg = `Hey ${address}, ${interaction.user.username} is trying to send you ${amount} ${tokenName}. Please, register your wallet using /setwallet `;
                ephemeral = false;


            }
            else { // token listed and receiver wallet connected 
                msg = `Click the link to transfer: https://peterthebot.com?token=${tokenAddress}&amount=${amount}&receiver=${walletDB.near_wallet}&burner=${burnWallet}`
                ephemeral = true;
            };

            await interaction.reply({
                content: msg,
                ephemeral: ephemeral,
            });

        }



    }
};



