// Load .env variables
require('dotenv').config();

// Import required parts from discord.js
const { Client, GatewayIntentBits } = require('discord.js');

const keepAlive = require("./server.js");
// Fix for node-fetch in Commonjs
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

// Create a new client 
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// channel id  
const CHANNEL_ID = '790530004454735905';

// Ayah counts for each surah from quran
const ayahCounts = [
  7, 286, 200, 176, 120, 165, 206, 75, 129, 109, 123, 111, 43, 52, 99,
  128, 111, 110, 98, 135, 112, 78, 118, 64, 77, 227, 93, 88, 69, 60,
  34, 30, 73, 54, 45, 83, 182, 88, 75, 85, 54, 53, 89, 59, 37, 35, 38,
  29, 18, 45, 60, 49, 62, 55, 78, 96, 29, 22, 24, 13, 14, 11, 11, 18,
  12, 12, 30, 52, 52, 44, 28, 28, 20, 56, 40, 31, 50, 40, 46, 42, 29,
  19, 36, 25, 22, 17, 19, 26, 30, 20, 15, 21, 11, 8, 8, 19, 5, 8, 8,
  11, 11, 8, 3, 9, 5, 4, 7, 3, 6, 3, 5, 4, 5, 6
];

// function to get a random integer between min and max
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to fetch a random ayah from quran
function getRandomAyah() {
  const surah = getRandomInt(1, 114);
  const ayah = getRandomInt(1, ayahCounts[surah - 1]);
  const url = `http://api.alquran.cloud/v1/ayah/${surah}:${ayah}`;

  return fetch(url)
    .then(res => res.json())
    .then(data => {
      if (data.status === 'OK') {
        return `📖 *Surah ${data.data.surah.englishName}, Ayah ${ayah}*\n\n"${data.data.text}"`;
      } else {
        throw new Error('Failed to fetch ayah');
      }
    })
    .catch(err => {
      console.error(err);
      return null;
    });
}

// When the bot is ready  after running it with node js
client.once('ready', () => {
  console.log(` Logged in as ${client.user.tag}`);

  // Send a random ayah every 10 minutes
  setInterval(async () => {
    const ayah = await getRandomAyah();
    const channel = await client.channels.fetch(CHANNEL_ID);
    if (channel && ayah) {
      channel.send(ayah);
    }
  }, 20 * 60 * 1000);//timer
});


keepAlive();
// Login to Discord using token from .env
client.login(process.env.token);
