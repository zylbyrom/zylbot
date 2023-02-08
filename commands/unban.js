const Discord = require("discord.js")

module.exports = {

    name: "unban",
    description: "Unban un membre",
    permission: Discord.PermissionFlagsBits.BanMembers,
    dm: false,
    category: "Modération",
    options: [
        {
            type: "user",
            name: "utilisateur",
            description: "Utilisateur à débannir",
            required: true,
            autocomplete: false
        }, {
            type: "string",
            name: "raison",
            description: "Raison du débannisement",
            required: false,
            autocomplete: false
        }
    ],

    async run(bot, message, args) {

       try {

        let user = args.getUser("utilisateur")
        if(!user) return message.reply("pas d'utilisateur")

        let reason = args.getString("raison")
        if(!reason) reason = "Aucune raison"

        if(!(await message.guild.bans.fetch()).get(user.id)) return message.reply("cet utilisateur est pas bannis")

        try {await user.send(`Tu as été unban pas ${message.user.tag} pour la raison: \`${reason}\``)} catch (error) {}

        await message.reply(`${message.user.tag} a été unban pour la raison: \`${reason}\``)

        await message.guild.members.unban(user, reason)


       } catch (error) {

        message.reply("pas de d'utilisateur trouvé")
       }
    }
}