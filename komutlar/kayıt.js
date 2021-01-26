const Discord = require("discord.js");

exports.run = (message, client, args) => {
  if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("yetkin yok")
  
  const üye = message.mentions.members.first()
  if(!üye) return message.reply("bir üye belirt")
  
üye.roles.add("803591170818572348")
üye.roles.remove("803590514066194432")
  
message.channel.send(`üye başarıyla kayıt edildi.`).then(message.react(`✅`))
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