const Discord = require("discord.js");
const db = require("quick.db");

exports.run = (client, message, args) => {
  if(!message.member.hasPermission("ADMINISTRATOR")) return;
  
const overwrite = message.mentions.members.first();
if(!overwrite) return;
  
const animeismi = args.splice(1).join(' ')
if(!animeismi) return;
  
db.push(`izlenilenanimeler.${overwrite.id}`, {
  Anime: animeismi
})
  
message.react(`✅`)

}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["yeni-anime-izledim", "anime-izledim"],
  permLevel: 0
}
exports.help = {
  name: "yeni-anime",
  description: "bruh",
  usage: "!yeni-anime ${overwrite} ${animeismi}"
}