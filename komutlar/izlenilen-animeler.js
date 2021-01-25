const Discord = require("discord.js")
const db = require("quick.db")

exports.run = async (client, message, args) => {

let overwrite = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.author;
  if(!overwrite) overwrite = message.author

let izlenilenanimeler = db.get(`izlenilenanimeler.${overwrite.id}`) || [];
izlenilenanimeler = izlenilenanimeler.reverse();
let animeListesi = izlenilenanimeler.length > 0 ? izlenilenanimeler.map((value) => `\`>\` ${value.Anime}`).join("\n") : `:x: ${overwrite} hiç anime izlememiş.`;

let overEmbed = new Discord.MessageEmbed().setColor("#2f3136")
  
message.channel.send(overEmbed.setDescription(`
:white_check_mark:  **${overwrite} kullanıcısının izlediği animeler:**

${animeListesi}
`))
  
message.react(`✅`)

};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["izledikleri-animeler", "izledigi-animeler"],
  permLevel: 0
}
exports.help = {
  name: "izlenilen-animeler",
  description: "bruh",
  usage: "!izlenilen-animeler ${overwritee}"
}