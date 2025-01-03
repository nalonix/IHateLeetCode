const TelegramBot = require("node-telegram-bot-api");
const handlers = require("./handlers");

const token = process.env.BOT_API_KEY;
if (!token) {
    console.error("BOT_API_KEY is missing in .env file");
    process.exit(1);
}

const bot = new TelegramBot(token, { polling: true });

// Register message handler
bot.on("message", async (msg) => {
    await handlers.handleMessage(bot, msg);
});

module.exports = bot;
