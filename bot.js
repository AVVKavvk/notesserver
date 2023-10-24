const { Telegraf } = require("telegraf");
const { message } = require("telegraf/filters");
const bot = new Telegraf("6782667256:AAGWS0pas1NGKHXFVQ--5r9kIct-7MOEc6Y");
const botArray=require('./assets/bot.json')
const axios = require("axios");
module.exports= async ()=>{
  bot.start(ctx => {
    let welcomeMessage =
      "Welcome to the DSA and C++ Algorithms Bot!\n\n" +
      "This bot provides you with DSA (Data Structures and Algorithms) algorithms and C++ code for the most important problems.\n\n" +
      "To get started, simply type any commands start with '/' or click on given command :\n\n";
  
    // Group the commands in rows of 4
    for (let i = 0; i < botArray.length; i += 4) {
      const commandsInRow = botArray
        .slice(i, i + 4)
        .map(item => `/${item.title}`)
        .join("\t\t\t");
  
      welcomeMessage += commandsInRow + "\n\n";
    }
  
    ctx.reply(welcomeMessage);
  });
  
  bot.on("sticker", ctx => {
    ctx.reply("You sent a sticker! 👍");
  });
  {
    botArray?.map(item => {
      bot.command(`${item?.title}`, async function (ctx) {
        const response = await axios(`${item?.code}`);
        ctx.reply(response?.data);
        setTimeout(() => {
          ctx.reply("/start");
          return;
        }, 1500);
      });
    });
  }
  
  // Start the bot and enable graceful stop
  bot.launch();
  process.once("SIGINT", () => bot.stop("SIGINT"));
  process.once("SIGTERM", () => bot.stop("SIGTERM"));
  
}
