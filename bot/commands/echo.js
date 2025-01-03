module.exports = async (bot, msg) => {
    const chatId = msg.chat.id;
    const userInput = msg.text;
    const msg_id = msg.message_id;

    if(userInput){
        await bot.sendMessage(chatId, userInput, {
            reply_to_message_id: msg_id,
        });
    }
};
