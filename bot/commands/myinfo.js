module.exports = async (bot, msg) => {
    const chatId = msg.chat.id;
    const msg_id = msg.message_id;

    const userId = msg.from.id;
    const firstName = msg.from.first_name || "N/A";
    const lastName = msg.from.last_name || "N/A";
    const username = msg.from.username || "N/A";

    const userInfoMessage = `Here are your details:
- User ID: ${userId}
- First Name: ${firstName}
- Last Name: ${lastName}
- Username: ${username}`;

    await bot.sendMessage(chatId, userInfoMessage, {
        reply_to_message_id: msg_id,
    });
};
