const mineflayer = require('mineflayer');
const express = require('express');

// 1. බෝට්ගේ විස්තර සකස් කිරීම
const botOptions = {
  host: 'mc.cwresports.lk',
  port: 25565,
  username: 'Night_Tracker', // Username එක
  version: '1.21.1',         // CwR 1.21.x සඳහා
  auth: 'offline'
};

let bot;

function createBot() {
  bot = mineflayer.createBot(botOptions);

  // බෝට් සාර්ථකව Server එකට ආ විට
  bot.on('spawn', () => {
    console.log('Bot සාර්ථකව CwR සර්වර් එකට join වුණා!');
    
    // Hub එකට ආවාට පසුව Lifesteal සර්වර් එකට Auto යාම
    setTimeout(() => {
        bot.chat('/server lifesteal'); 
        console.log('Lifesteal සර්වර් එකට ඇතුළු වුණා.');
    }, 4000);

    // සර්වර් එකෙන් AFK Kick නොවී ඉන්න හැම තත්පර 8කට වරක්ම Jump කිරීම
    setInterval(() => {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 500);
    }, 8000);
  });

  // CwR Cracked Server එකක් නිසා Auto Register/Login වීම සඳහා
  bot.on('message', (jsonMsg) => {
    const message = jsonMsg.toString();
    if (message.includes('/login') || message.includes('please login') || message.includes('ඇතුළු වන්න')) {
      bot.chat('/login chocalate123@'); // Password එක
    }
  });

  // සර්වර් එක Restart වුණොත් හෝ Kick වුණොත් Auto Reconnect වීම
  bot.on('end', () => {
    console.log('සර්වර් එකෙන් disconnect වුණා. තත්පර 15කින් නැවත සම්බන්ධ වෙනවා...');
    setTimeout(createBot, 15000);
  });

  bot.on('error', (err) => {
    console.log('Error එකක් ආවා: ', err);
  });
}

// Bot ව ක්‍රියාත්මක කිරීම
createBot();

// Web Server එකක්
const app = express();
app.get("/", (req, res) => {
  res.send("Bot is Online 24/7!");
});
app.listen(process.env.PORT || 3000, () => {
  console.log("Web server run වෙනවා...");
});
