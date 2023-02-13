const Discord = require("discord.js")

module.exports = {

    name: "kick",
    description: "kick un membre",
    permission: Discord.PermissionFlagsBits.KickMembers,
    dm: false,
    category: "Modération",
    options: [
        {
            type: "user",
            name: "membre",
            description: "Membre à kick",
            required: true,
            autocomplete: false
        }, {
            type: "string",
            name: "raison",
            description: "Raison du kick",
            required: false,
            autocomplete: false
        }
    ],

    async run(bot, message, args) {

        let user = args.getUser("membre")
        if(!user) return message.reply("pas de membre a kick")
        let member = message.guild.members.cache.get(user.id)
        if(!member) return message.reply("pas de membre a kick")

        let reason = args.getString("raison")
        if(!reason) reason = "pas de raison fournie";

        if(message.user.id === user.id) return message.reply("Essaie pas de te kick")
        if((await message.guild.fetchOwner()).id === user.id) return message.reply("tu ne peux pas kick ce membre")
        if(member && !member.kickable) return message.reply("tu ne peux pas kick ce membre")
        if(message && message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply("tu ne peux pas kick ce membre")

        try {await user.send(`tu as été kick du serveur ${message.guild.name} par ${message.user.tag} pour la raison : \`${reason}\``)} catch(err) {}

        await message.reply(`${message.user} a kick ${user.tag} pour la raison : \`${reason}\``)

        await member.kick(reason)
    }
}