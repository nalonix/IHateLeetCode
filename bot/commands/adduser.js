const User = require("../../db/models/user.model");

module.exports = async (bot, msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;
    const msg_id = msg.message_id;

    console.log(msg.from.id, process.env.ADMIN_ID)
    if(msg.from.id != process.env.ADMIN_ID){
        await bot.sendMessage(chatId, "You are not authorized to add users");
        return;
    }

    let inputs = text.split(" ");
    inputs.shift();

    // console.log("Inputs: ",inputs);

    // try catch adding user
    try {
        await bot.sendMessage(chatId, "Adding user...");
        const user = await User.create({
            id: inputs[0],
            leetcodeUsername: inputs[4],
            first_name: inputs[1],
            last_name: inputs[2],
            username: inputs[3],
        });
        await bot.sendMessage(chatId, `User ID ${user.id} - LeetCode ${user.leetcodeUsername} - First Name ${user.first_name} - Last Name ${user.last_name} - Username @${user.username}`);
 
    } catch (error) {
        console.error("Error sending message:", error.message);
        await bot.sendMessage(chatId, `Error adding user ${error.message}`);
        return;
    }



};