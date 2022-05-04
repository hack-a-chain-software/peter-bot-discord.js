const { SlashCommandBuilder } = require('@discordjs/builders');
const mongo = require('../structures/mongo')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('How to use Peter the wire bot'),


    async execute(interaction) {

        let message = await mongo.getHelp();

        await interaction.reply({
            content: message.message,
            ephemeral: true
        });
    }
};



