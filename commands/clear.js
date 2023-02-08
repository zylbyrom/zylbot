const Discord = require("discord.js")

module.exports = {

    name: "clear",
    description: "Clear",
    dm: false,
    permission: Discord.PermissionFlagsBits.ManageMessages,
    category: "Modération",
    options: [
        {
            type: "number",
            name: "nombre",
            description: "Nombre de messages à supprimer",
            required: true,
            autocomplete: false
        }, {
            type: "channel",
            name: "salon",
            description: "Salon",
            required: false,
            autocomplete: false
        },
    ],

    async run(bot, message, args) {

        let channel = args.getChannel("salon")
        if(!channel) channel = message.channel;
        if(channel.id !== message.channel.id && !message.guild.channels.cache.get(channel.id)) return message.reply("pas de salon")

        let number = args.getNumber("nombre")
        if(parseInt(number) <= 0 || parseInt(number) > 100) return message.reply("il nous faut un nombre entre `0` et `100`")

        await message.deferReply()

        try {

            let messages = await channel.bulkDelete(parseInt(number))

            await message.followUp({content: `\`${messages.size}\` message(s) supprimé(s)`, ephemeral: true})

        } catch (err) {

            let messages = [...(await channel.messages.fetch()).filter(msg => !msg.interaction && (Date.now() - msg.createdAt <= 1209600000))].values()
            if(messages.length <= 0) return message.reply("aucun message à supprimer")
            await channel.bulkDelete(messages)

            await message.followUp({content: `j'ai pu supprimé \`${messages.length}\` message(s) car les autres dataient de +14j)`, ephemeral: true})
        }
    }
}