const Discord = require("discord.js")
const intents = new Discord.IntentsBitField(3276799)
const bot = new Discord.Client({intents})
const loadcommand = require("./loaders/loadcommands")
const loadevent = require("./loaders/loadevents")
const config = require("./config")

bot.commands = new Discord.Collection()
bot.color = "#AE31E1";

bot.login(config.TOKEN)
loadcommand(bot)
loadevent(bot)