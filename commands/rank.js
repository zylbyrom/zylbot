const Discord = require("discord.js")
const canvas = require("discord-canvas-easy")

module.exports = {

    name: "rank",
    description: "Donne xp d'un membre",
    permission: "Aucune",
    dm: false,
    category: "Expérience",
    options: [
        {
            type: "user",
            name: "utilisateur",
            description: "L'xp du membre à voir",
            required: false,
            autocomplete: false
        }
    ],

    async run(bot, message, args, db) {

        let user;
        if(args.getUser("utilisateur")) {
            user = args.getUser("utilisateur")
            if(!user || !message.guild.members.cache.get(user.id)) return message.reply("Ce membre n'existe pas")
        } else user = message.user;

        db.query(`SELECT * FROM expérience WHERE guild = '${message.guildId}' AND user = '${user.id}'`, async (err, req) => {

            db.query(`SELECT * FROM expérience WHERE guild ) '${message.guildId}'`, async (err, all) => {
                
                if(req.length < 1) return message.reply("ce membre n'a aucun expérience")

                await message.deferReply()
                
                all = await req.sort(async (a, b) => (await bot.function.calculxp(parseInt(b.xp), parseInt(b.level))) - (await bot.function.calculxp(parseInt(a.xp), parseInt(a.level))))
                let xp = parseInt(req[0].xp)
                let level = parseInt(req[0].level)
                let rank = all.findIndex(r => r.user === message.user.id) + 1
                let need = (level + 1) * 1000;

                let Card = await new canvas.Card()
                .setBackground("https://somoskudasai.com/wp-content/uploads/2020/08/portada_solo-leveling.jpg")
                .setBot(bot)
                .setColorFont("#ffffff")
                .setRank(rank)
                .setUser(user)
                .setColorProgressBar(bot.color)
                .setGuild(message.guild)
                .setXp(xp)
                .setLevel(level)
                .setXpNeed(need)
                .toCard()

                await message.followUp({files: [new Discord.AttachmentBuilder(Card.toBuffer(), {name: "rank.png"})]})
            })
        })
    }
}