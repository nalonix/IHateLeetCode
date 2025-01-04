// accept input in the format below
// /updateuser <id>  <column to update>  <new value>

module.exports = async (bot, msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;
    const msg_id = msg.message_id;

    console.log(msg.from.id, process.env.ADMIN_ID)
    if(msg.from.id != process.env.ADMIN_ID){
        await bot.sendMessage(chatId, "You are not authorized to update users");
        return;
    }

    let inputs = text.split(" ");
    inputs.shift();

    // console.log("Inputs: ",inputs);

    // try catch adding user
    try {
        await bot.sendMessage(chatId, "Updating user...");
        const user = await User.findOneAndUpdate({ id: inputs[0] }, { [inputs[1]]: inputs[2] });
        await bot.sendMessage(chatId, `User ID ${user.id} - LeetCode ${user.leetcodeUsername} - First Name ${user.first_name} - Last Name ${user.last_name} - Username @${user.username}`);
 
    } catch (error) {
        console.error("Error sending message:", error.message);
        await bot.sendMessage(chatId, `Error updating user ${error.message}`);
        return;
    }



};