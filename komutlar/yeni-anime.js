const Discord = require("discord.js");
const db = require("quick.db");

exports.run = (client, message, args) => {
  if(!message.member.hasPermission("ADMINISTRATOR")) return;
  
const overwrite = message.mentions.members.first();
}