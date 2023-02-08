const Discord = require("discord.js")
const ms = require("ms")

module.exports = {

    name: "mute",
    description: "Mute un membre",
    dm: false,
    permission: Discord.PermissionFlagsBits.ModerateMembers,
    category: "Modération",
    options: [
        {
            type: "user",
            name: "membre",
            description: "Membre à mute",
            required: true,
            autocomplete: false
        }, {
            type: "string",
            name: "temps",
            description: "Temps du mute",
            required: true,
            autocomplete: false
        }, {
            type: "string",
            name: "raison",
            description: "Raison du mute",
            required: false,
            autocomplete: false
        }
    ],

    async run(bot, message, args) {

        let user = args.getUser("membre")
        if(!user) return message.reply("Pas de membre")
        let member = message.guild.members.cache.get(user.id)
        if(!member) return message.reply("Membre introuvable")
        
        let time = args.getString("temps")
        if(!time) return message.reply("Pas de temps")
        if(isNaN(ms(time))) return message.reply("Temps introuvable")
        if(ms(time) > 2419200000) return message.reply("le mute ne peut pas depassé 28j")

        let reason = args.getString("raison")
        if(!reason) reason = "Aucune raison";

        if(message.user.id === user.id) return message.reply("ne te mute pas tout seul")
        if(await message.guild.fetchOwner().id === user.id) return message.reply("tu ne peux pas mute ce membre")
        if(!member.moderatable) return message.reply("le membre ne peut pas être mute")
        if(message && message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply("tu ne peux pas mute ce membre")
        if(member.isCommunicationDisabled()) return message.reply("ce membre est déjà bannis")

        try {await user.send(`tu as été mute du serveur ${message.guild.name} pas ${message.user.tag} pendant ${time} pour la raison : \`${reason}\``)} catch(err) {}

        await message.reply(`${message.user} a mute ${user.tag} pendant ${time} pour la raison : \`${reason}\``)

        await member.timeout(ms(time), reason)
    }
}