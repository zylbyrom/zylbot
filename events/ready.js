const Discord = require("discord.js")
const loadslashcommands = require("../loaders/loadslashcommands")

module.exports = async bot => {

    await loadslashcommands(bot)

    console.log(`${bot.user.username} est bien en ligne`)
}