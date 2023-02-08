const Discord = require("discord.js")
const ms = require("ms")

module.exports = {

    name: "unmute",
    description: "Unmute un membre",
    dm: false,
    permission: Discord.PermissionFlagsBits.ModerateMembers,
    category: "Modération",
    options: [
        {
            type: "user",
            name: "membre",
            description: "Membre à unmute",
            required: true,
            autocomplete: false
        }, {
            type: "string",
            name: "raison",
            description: "Raison du unmute",
            required: false,
            autocomplete: false
        }
    ],

    async run(bot, message, args) {

        let user = args.getUser("membre");
        if(!user) return message.reply("Pas de membre")
        let member = message.guild.members.cache.get(user.id)
        if(!member) return message.reply("Membre introuvable")

        let reason = args.getString("raison")
        if(!reason) reason = "Aucune raison"

        if(!member.moderatable) return message.reply("je ne peux pas unmute ce membre")
        if(message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply("vous ne pouvez pas unmute ce membre")
        if(!member.isCommunicationDisabled()) return message.reply("ce membre n'est pas mute")

        try {await user.send(`tu as été unmute du serveur ${message.guild.name} pas ${message.user.tag} pour la raison : \`${reason}\``)} catch(err) {}

        await message.reply(`${message.user} a unmute ${user.tag} pour la raison : \`${reason}\``)

        await member.timeout(null, reason)
    }
}