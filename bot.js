const { Telegraf } = require("telegraf");
const { message } = require("telegraf/filters");
const bot = new Telegraf("6782667256:AAGWS0pas1NGKHXFVQ--5r9kIct-7MOEc6Y");

module.exports= async ()=>{
    bot.start(ctx => ctx.reply("Welcome to your bot!"));

    // Handle incoming messages
    bot.on("text", ctx => {
      const chatId = ctx.message.chat.id;
      const messageText = ctx.message.text;
    
      // Respond to user messages
      if (
        messageText.toLowerCase() === "hi" ||
        messageText.toLowerCase() === "hello"
      ) {
        ctx.reply("vipin");
      } else {
        ctx.reply("I am a simple bot. You can say hello or ask for assistance.");
      }
    });
    
    // Handle stickers
    bot.on("sticker", ctx => {
      ctx.reply("You sent a sticker! 👍");
    });
    
    // Start the bot and enable graceful stop
    bot.launch();
    process.once("SIGINT", () => bot.stop("SIGINT"));
    process.once("SIGTERM", () => bot.stop("SIGTERM"));
    
}
