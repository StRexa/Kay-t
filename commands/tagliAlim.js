const Discord = require("discord.js")
const db = require("quick.db")
const ayarlar = require("../ayarlar.json")

module.exports.run = async (client, message, args) => {
    if(!message.member.id.includes(ayarlar.sahip)) return;

    const arwEmbed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setFooter(ayarlar.footer)
    .setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
    .setTimestamp()

const qweArw = args[1];
if(!qweArw) return message.channel.send(`${client.emojis.cache.get(ayarlar.no)} **.tagliAlim \`aç\` ya da \`kapat\` yazmalısın!**`).then(message.react(client.emojis.cache.get(ayarlar.no)))

if(qweArw === "aç") {
    db.set(`tagliAlim.${message.guild.id}`, true)

    message.channel.send(arwEmbed.setDescription(`
Taglı alım başarıyla açıldı!
    `)).then(message.react(client.emojis.cache.get(ayarlar.yes)))
}

if(qweArw === "kapat") {
    db.delete(`tagliAlim.${message.guild.id}`)

    message.channel.send(arwEmbed.setDescription(`
Taglı alım başarıyla kapatıldı!
    `)).then(message.react(client.emojis.cache.get(ayarlar.yes)))
}

if(qweArw === "kapa") {
    db.delete(`tagliAlim.${message.guild.id}`)

    message.channel.send(arwEmbed.setDescription(`
Taglı alım başarıyla kapatıldı!
    `)).then(message.react(client.emojis.cache.get(ayarlar.yes)))
}

}
exports.config = {
    name: "tagliAlim",
    guildOnly: true,
    aliases: ["taglıAlım", "TaglıAlım", "TagliAlim"]
}