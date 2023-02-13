const Discord = require("discord.js")

module.exports = {

    name: "warnlist",
    description: "Affiche les warns d'un membre",
    dm: false,
    permission: Discord.PermissionFlagsBits.ManageMessages,
    category: "Modération",
    options: [
        {
            type: "user",
            name: "membre",
            description: "Membre à afficher les warns",
            required: true,
            autocomplete: false
        }
    ],

    async run(bot, message, args, db) {
        
        let user = args.getUser("membre")
        if(!user) return message.reply("pas de membre")
        let member = message.guild.members.cache.get(user.id)
        if(!member) return message.reply("pas de membre")

        db.query(`SELECT * FROM warns WHERE guild = ${message.guildId} AND user = ${user.id}`, async (err, req) => {

            if(req.length < 1) return message.reply("aucun warn")
            await req.sort((a, b) => parseInt(b.date) - parseInt(a.date))

            let Embed = new Discord.EmbedBuilder()
            .setColor(bot.color)
            .setTitle(`Warns de: ${member.user.tag}`)
            .setThumbnail(user.displayAvatarURL({ dynamic: true}))
            .setTimestamp()
            .setFooter({text: "Warns"})

            for(let i = 0; i < req.length; i++) {

                Embed.addFields([{name: `Warn n°${i+1}`, value: `> **Autheur** : ${(await bot.users.fetch(req[i].author)).tag}\n> **ID** : \`${req[i].warn}\`\n> **Raison** : \`${req[i].reason}\`\n> **Date** : <t:${Math.floor(parseInt(req[i].date) / 1000)}:F>`}])
            }

            await message.reply({embeds: [Embed]})
        })
    }
}