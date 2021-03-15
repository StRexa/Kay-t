const Discord = require("discord.js");
const db = require("quick.db");
const ayarlar = require("../ayarlar.json")

module.exports.run = async (client, message, args) => {
    if(ayarlar.yetkiliRol.some(arwene => message.member.roles.cache.has(arwene)) && !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`${client.guild.emojis.cache.get(ayarlar.no)} **Bu işlemi gerçekleştirmek için gerekli yetkin yok!**`).then(message.react(client.emojis.cache.get(ayarlar.no)))

    const etiketlenenKişi = message.mentions.members.first() || message.guild.members.cache.get(args[1]);
if(!etiketlenenKişi) return message.channel.send(`${client.guild.emojis.cache.get(ayarlar.no)} **İsim değiştirmek için bir kişi etiketlemelisin!**`).then(message.react(client.emojis.cache.get(ayarlar.no)))

const isim = args.splice(1).join(' ')
if(!isim) return message.channel.send(`${client.guild.emojis.cache.get(ayarlar.no)} **İsim değiştirmek için bir isim belirtmelisin!**`).then(message.react(client.emojis.cache.get(ayarlar.no)))

etiketlenenKişi.setNickname(`${isim} Shex`)

message.react(client.emojis.cache.get(ayarlar.yes))

const arwEmbed = new Discord.MessageEmbed()
.setColor("RANDOM")
.setDescription(`Kullanıcının ismi \`${isim} Shex\` olarak değiştirildi!`)
.setFooter(ayarlar.footer)
.setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
.setTimestamp()

message.channel.send(arwEmbed)

db.push(`isimler.${etiketlenenKişi.id}`, `
İsim: isim
Yetkili: message.author
`)

}
exports.config = {
    name: "isim",
    guildOnly: true,
    aliases: ["i", "nick"]
}