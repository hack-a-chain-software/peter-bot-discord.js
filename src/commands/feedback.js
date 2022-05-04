const { SlashCommandBuilder } = require('@discordjs/builders');
const mongo = require('../structures/mongo')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('feedback')
        .setDescription('Share your feedback with our developers')
        .addStringOption(option =>
            option.setName('feedback')
                .setDescription('Your feedback')
                .setRequired(true)),


    async execute(interaction) {

        const message = interaction.options.getString("feedback")
        const username = interaction.user.username
        const user_id = interaction.user.id
        const guild_id = interaction.member.guild.id


        await mongo.addFeedback(user_id, guild_id, message)


        await interaction.reply({
            content: `Hey ${username}, thanks for the feedback`, //Your wallet was set - to change your wallet, just use this command again
            ephemeral: true
        });
    }
};



