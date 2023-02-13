const Discord = require("discord.js")

module.exports = {

    name: "ban",
    description: "Ban un membre",
    permission: Discord.PermissionFlagsBits.BanMembers,
    dm: false,
    category: "Modération",
    options: [
        {
            type: "user",
            name: "membre",
            description: "Membre à bannir",
            required: true,
            autocomplete: false
        }, {
            type: "string",
            name: "raison",
            description: "Raison du bannisement",
            required: false,
            autocomplete: false
        }
    ],

    async run(bot, message, args) {

        try {

            let user = await bot.users.fetch(args._hoistedOptions[0].value)
            if(!user) return message.reply("pas de membre a bannir")
            let member = message.guild.members.cache.get(user.id)

            let reason = args.getString("raison")
            if(!reason) reason = "pas de raison fournie";

            if(message.user.id === user.id) return message.reply("Essaie pas de te bannir")
            if((await message.guild.fetchOwner()).id === user.id) return message.reply("tu ne peux pas bannir ce membre")
            if(member && !member.bannable) return message.reply("tu ne peux pas bannir ce membre")
            if(message && message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply("tu ne peux pas bannir ce membre")
            if((await message.guild.bans.fetch()).get(user.id)) return message.reply("ce membre est déjà ban")

            try {await user.send(`tu as été banni du serveur ${message.guild.name} par ${message.user.tag} pour la raison : \`${reason}\``)} catch(err) {}

            await message.reply(`${message.user} a banni ${user.tag} pour la raison : \`${reason}\``)

            await message.guild.bans.create(user, {reason: reason})
        } catch (err) {

            return message.reply("pas de membre a bannir !")
        }
    }
}