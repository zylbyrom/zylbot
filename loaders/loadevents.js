const fs = require("fs")
const { join } = require("path")

module.exports = async bot => {

    fs.readdirSync("./events").filter(f => f.endsWith(".js")).forEach(async file => {

        let event = require(`../events/${file}`)
        bot.on(file.split(".js").join(""), event.bind(null, bot))
        console.log(`Evenement ${file} chargé avec succès !`)
    })
}