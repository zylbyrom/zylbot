const Discord = require("discord.js")

module.exports = {

    name: "wiz",
    description: "Wiz",
    dm: true,
    permission: "Aucune",
    category: "Information",

    async run(bot, message, args) {

        await message.reply(`wizards le grand et l'unique WIZBOT !`)
    }
}