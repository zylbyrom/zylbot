const Discord = require("discord.js")

module.exports = {

    name: "warn",
    description: "Warn un membre",
    dm: false,
    permission: Discord.PermissionFlagsBits.ManageMessages,
    category: "Modération",
    options: [
        {
            type: "user",
            name: "membre",
            description: "Le membre à warn",
            required: true,
            autocomplete: false
        }, {
            type: "string",
            name: "raison",
            description: "Raison du warn",
            required: false,
            autocomplete: false
        },
    ],

    async run(bot, message, args, db) {

        let user = args.getUser("membre")
        if(!user) return message.reply("pas de membre")
        let member = message.guild.members.cache.get(user.id)
        if(!member) return message.reply("le membre n'existe pas")
        
        let reason = args.getString("raison")
        if(!reason) reason = "Aucune raison fournie"

        if(message.user.id === user.id) return message.reply("Essaie pas de te warn")
        if((await message.guild.fetchOwner()).id === user.id) return message.reply("tu ne peux pas warn ce membre")
        if(member && !member.bannable) return message.reply("tu ne peux pas warn ce membre")
        if(message && message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply("tu ne peux pas warn ce membre")
        if((await message.guild.members.fetchMe()).roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply("le bot ne peux pas warn ce membre")

        try { await user.send(`${message.user.tag} vous a warn sur le serveur ${message.guild.name} pour la raison : \`${reason}\``)} catch (err) {}

        await message.reply(`Vous avez warn ${user.tag} pour la raison : \`${reason}\` avec succès`)

        let ID = await bot.function.createId(`WARN`)

        db.query(`INSERT INTO warns (guild, user, author, warn, reason, date) VALUES (${message.guild.id}, ${user.id}, ${message.user.id}, "${ID}", "${reason.replace(/'/g, "\\'")}", ${Date.now()})`)
    }
}