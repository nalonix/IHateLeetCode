const User = require("../../db/models/user.model");

module.exports = async (bot, msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;
    const msg_id = msg.message_id;
    
    try {
        await bot.sendMessage(chatId, "Fetching users...");
        const users = await User.find();

        let reportMessage = `👥 All users:\n`;
        for (const user of users) {
            reportMessage += `@${user.username} - ${user.first_name} ${user.last_name} - ${user.leetcodeUsername}\n`;
        }
        await bot.sendMessage(chatId, reportMessage);
    } catch (error) {
        console.error("Error sending message:", error.message);
        await bot.sendMessage(chatId, `Error adding user ${error.message}`);
        return;
    }
};