const Discord = require("discord.js")

module.exports = {

    name: "ping",
    description: "Ping",
    dm: true,
    permission: "Aucune",
    category: "Information",

    async run(bot, message, args) {

        await message.reply(`Ping : \`${bot.ws.ping}\``)
    }
}