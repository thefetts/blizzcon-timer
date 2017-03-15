const Discord = require('discord.js');
const moment = require('moment-timezone');
const bot = new Discord.Client();

const ticketsOnSale = moment.tz('2017-04-05 19:00', 'America/Los_Angeles').tz('America/Denver');
const ticketsOnSale2 = moment.tz('2017-04-08 10:00', 'America/Los_Angeles').tz('America/Denver');
const blizzConStart = moment.tz('2017-11-03 08:00', 'America/Los_Angeles').tz('America/Denver');

function timeUntil() {
  return `Time until BlizzCon tickets go on sale: **${timeUntilDate(ticketsOnSale)}**\n` +
    `Time until BlizzCon starts: **${timeUntilDate(blizzConStart)}**`;
}

function timeUntilDate(date) {
  const duration = moment.duration(date.diff(moment().tz('America/Denver')));
  return formatDuration(duration);
}

function formatDuration(duration) {
  return `${duration.months()} months, ${duration.days()} days, ${duration.hours()} hours and ${duration.minutes()} minutes!`;
}

function info() {
  return `Confirmed by Blizzard, tickets first go on sale:\n` +
    `  **${formatDate(ticketsOnSale)}**\n\n` +
    `There is a second round on sale at:\n` +
    `  **${formatDate(ticketsOnSale2)}**\n\n` +
    `The convention itself starts at:\n` +
    `  **${formatDate(blizzConStart)}**`;
}

function formatDate(date) {
  return date.format('dddd, MMMM Do YYYY [at] h:mma z');
}

bot.on('message', msg => {
  if (msg.content.toLowerCase().startsWith('!blizzcon info')) {
    msg.channel.sendMessage(info());
  } else if (msg.content.toLowerCase().startsWith('!blizzcon')) {
    msg.channel.sendMessage(timeUntil());
  }
});

bot.on('ready', () => {
  console.log('ready');
});

bot.login(process.env.token);
