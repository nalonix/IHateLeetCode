const commands = require("./commands");

const handleMessage = async (bot, msg) => {
    const userInput = msg.text;

    if (userInput && userInput.startsWith("/")) {
        const commandName = userInput.split(" ")[0].substring(1); // Extract command name
        const commandHandler = commands[commandName];

        if (commandHandler) {
            await commandHandler(bot, msg);
        } else {
            await bot.sendMessage(msg.chat.id, "Unknown command. Type /help for a list of commands.");
        }
    } else {
        // Default handler (e.g., echo)
        await commands.echo(bot, msg);
    }
};

module.exports = { handleMessage };
