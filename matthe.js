// Sorununz olursa Matthe#0001 ulaşınız.

const Discord = require("discord.js")
const client = new Discord.Client()
const ayarlar = require("./ayarlar.json")
const moment = require("moment")//Matthe#1000
const fs = require("fs")
const db = require("quick.db")
const chalk = require("chalk")
require('./util/Loader.js')(client)

client.commands = new Discord.Collection()
client.aliases = new Discord.Collection()
fs.readdir('./commands/', (err, files) => { 
  if (err) console.error(err);               
  console.log(`${files.length} komut yüklenecek.`)//Youtube Matthe
  files.forEach(f => {                    
    let props = require(`./commands/${f}`)
    console.log(`${props.config.name} komutu yüklendi.`)
    client.commands.set(props.config.name, props)
    props.config.aliases.forEach(alias => {       
      client.aliases.set(alias, props.config.name)
    });
  });
})

client.on('message', async message => {
  
  if(message.content === '.tag') {
    message.channel.send(`\`${ayarlar.tag}\``)//Youtube Matthe
  }
  })

client.on("ready", () => {
    console.log(chalk.redBright(`tm`))
})

client.on("guildMemberAdd", async (member) => {
  let arwSayılar = {
    "0": `${ayarlar.sifirEmoji}`,
    "1": `${ayarlar.birEmoji}`,
    "2": `${ayarlar.ikiEmoji}`,
    "3": `${ayarlar.ucEmoji}`,
    "4": `${ayarlar.dortEmoji}`,
    "5": `${ayarlar.besEmoji}`,
    "6": `${ayarlar.altiEmoji}`,
    "7": `${ayarlar.yediEmoji}`,
    "8": `${ayarlar.sekizEmoji}`,
    "9": `${ayarlar.dokuzEmoji}`//Youtube Matthe
}

const arwKanal = client.channels.cache.get(ayarlar.hosgeldinKanal)
let arwMember = member.user
let arwZaman = new Date().getTime() - arwMember.createdAt.getTime()
const arw = `Ve senin hesabın sunucumuza kayıt olmak için tüm şartları karşılıyor! ${client.emojis.cache.get(ayarlar.yes)}`//Youtube Matthe
if(arwZaman < 1296000000) {
  arw = `Ve senin hesabın sunucumuza kayıt olmak için daha çok genç! ${client.emojis.cache.get(ayarlar.no)}`//Youtube Matthe
}
  
member.roles.add(ayarlar.kayıtsızRol)
member.roles.add(ayarlar.kayıtsızRol)
member.roles.add(ayarlar.kayıtsızRol)//Youtube Matthe

member.setNickname(`${ayarlar.tag} İsim ${ayarlar.sembol} Yaş`)
arwKanal.send(`
${client.emojis.cache.get(ayarlar.hosgeldinMesajEmoji)}  Sunucumuza hoş geldin, ${member}! Sayende sunucumuz ${member.guild.memberCount.toString().split("").map(a => client.emojis.cache.get(arwSayılar[a])).join("")} kişi.

${client.emojis.cache.get(ayarlar.hosgeldinMesajEmoji)}  Sunucumuza kayıt olmak için soldaki ses kanallarından birine girmelisin!

${client.emojis.cache.get(ayarlar.hosgeldinMesajEmoji)}  Ayrıca hesabın 15 günden fazla bir süredir Discord'da bulunmalı.

${client.emojis.cache.get(ayarlar.hosgeldinMesajEmoji)}  ${arw}

${client.emojis.cache.get(ayarlar.hosgeldinMesajEmoji)}  Ceza işlemlerin <#${ayarlar.rulesKanal}> kanalını okuduğun varsayılarak uygulanır. ( <@&${ayarlar.hosgeldinMesajYetkili}> )
`)//eğer emjiler undefined olarak gözüküyorsa veya hoş geldin mesajı atmıyorsa ${client.emojis.cache.get(ayarlar.hosgeldinMesajEmoji)} bunları siliniz.
  
})

client.login(process.env.TOKEN)

client.on("ready", () => {
  client.channels.cache.get(ayarlar.botSesKanal).join();
  });
//Youtube Matthe
