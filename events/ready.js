const Discord = require("discord.js")
const loadDatabase = require("../loaders/loadDatabase")
const loadslashcommands = require("../loaders/loadslashcommands")

module.exports = async bot => {

    bot.db = await loadDatabase()
    bot.db.connect(function() {
        console.log("Base de donnée connectée")
    })

    await loadslashcommands(bot)

    console.log(`${bot.user.username} est bien en ligne`)
}