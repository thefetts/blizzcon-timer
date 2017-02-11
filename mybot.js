const Discord = require('discord.js');
const moment = require('moment-timezone');
const bot = new Discord.Client();

const ticketsOnSale = moment.tz('2017-04-19 19:00', 'America/Los_Angeles').tz('America/Denver');
const blizzConStart = moment.tz('2017-11-03 08:00', 'America/Los_Angeles').tz('America/Denver');

function timeUntil() {
  return `Time until BlizzCon tickets go on sale (maybe): **${timeUntilDate(ticketsOnSale)}**\n` +
    `Time until BlizzCon starts (maybe): **${timeUntilDate(blizzConStart)}**`;
}

function timeUntilDate(date) {
  const duration = moment.duration(date.diff(moment().tz('America/Denver')));
  return formatDuration(duration);
}

function formatDuration(duration) {
  return `${duration.months()} months, ${duration.days()} days, ${duration.hours()} hours and ${duration.minutes()} minutes!`;
}

function info() {
  return `Based on 2016 dates, I'm currently assuming tickets will go on sale:\n` +
    `  **${formatDate(ticketsOnSale)}**\n\n` +
    `And assuming the convention starts:\n` +
    `  **${formatDate(blizzConStart)}**\n\n` +
    `If this information is outdated, please let Jordan know!`;
}

function formatDate(date) {
  return date.format('dddd, MMMM Do YYYY [at] h:mma z');
}

bot.on('message', msg => {
  if (msg.content.startsWith('!blizzcon info')) {
    msg.channel.sendMessage(info());
  } else if (msg.content.startsWith('!blizzcon')) {
    msg.channel.sendMessage(timeUntil());
  }
});

bot.on('ready', () => {
  console.log('ready');
});

bot.login(process.env.token);
