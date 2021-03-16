const Discord = require("discord.js")
const client = new Discord.Client()
const ayarlar = require("./ayarlar.json")
const moment = require("moment")
const fs = require("fs")
const db = require("quick.db")
const chalk = require("chalk")
require('./util/Loader.js')(client)

client.commands = new Discord.Collection()
client.aliases = new Discord.Collection()
fs.readdir('./commands/', (err, files) => { 
  if (err) console.error(err);               
  console.log(`${files.length} komut yüklenecek.`)
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
  if (message.content === '.arwene') {
  client.emit('guildMemberAdd', message.member || await message.guild.fetchMember(message.author));
    message.delete()
  }
  
  if(message.content === '.tag') {
    message.channel.send(`**Shex** / **#1281**`)
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
    "9": `${ayarlar.dokuzEmoji}`
}

const arwKanal = client.channels.cache.get(ayarlar.hosgeldinKanal)
let arwMember = member.user
let arwZaman = new Date().getTime() - arwMember.createdAt.getTime()
const arw = `Hesabın sunucumuza kayıt olmak için **tüm şartları karşılıyor!** (${client.emojis.cache.get(ayarlar.yes)})`
if(arwZaman < 1296000000) {
  arw = `Hesabın sunucumuza kayıt olmak için **daha çok genç!** (${client.emojis.cache.get(ayarlar.no)})`
}
  
let arw2 = `tag alman`

member.roles.add(ayarlar.kayıtsızRol)
member.setNickname(`İsim Shex`)

arwKanal.send(`
${client.emojis.cache.get(ayarlar.hosgeldinMesajEmoji)}  __Shex #1281'e__ hoş geldin, **${member}**. Sayende sunucumuz ${member.guild.memberCount.toString().split("").map(a => client.emojis.cache.get(arwSayılar[a])).join("")} kişi.

${client.emojis.cache.get(ayarlar.hosgeldinMesajEmoji)}  Kayıt olduğun zamandan itibaren <#${ayarlar.rulesKanal}> okumuş sayılırsın. Cezalar buna göre verilir.

${client.emojis.cache.get(ayarlar.hosgeldinMesajEmoji)}  ${arw}

${client.emojis.cache.get(ayarlar.hosgeldinMesajEmoji)}  Kayıt olmak için ${arw2} gerek. **".tag"** yazarak taglara ulaşabilirsin!
`) 
})

client.login(process.env.TOKEN)

client.on("ready", () => {
  client.channels.cache.get("821073095682686986").join();
  });

