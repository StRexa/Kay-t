const Discord = require("discord.js");
const db = require("quick.db");

exports.run = (message, client, args) => {
  if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("yetkin yok")
  
const üye = message.mentions.members.first()
  if(!üye) return message.channel.send("bir üye belirt")
  
const isim = args.splice(1).join(' ')
if(!isim) return message.channel.send(`isim belirtmedin.`)

üye.setNickname(`${isim}`)
üye.roles.add("803591170818572348")
üye.roles.remove("803590514066194432")
  
message.channel.send(`üye başarıyla kayıt edildi.`) 
message.react(`✅`)
}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["kayıt-et", "kaydet"],
  permLevel: 0
}
exports.help = {
  name: "kayıt",
  description: "kayıt ediyo -overwrite",
  usage: "!kayıt"
}