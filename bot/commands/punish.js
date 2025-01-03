const axios = require('axios');
const { hoursDifference, dateToUnixEpoch } = require('../../utils/helpers');
const GROUP_ID = process.env.GROUP_ID;

module.exports = async (bot, msg) => {
    // 
    const date = new Date(); 
    const unixEpochTime = dateToUnixEpoch(date);
    const missedCount = 2;
    
    //
    const chatId = msg.chat.id;
    const type = msg.chat.type;

    if (type !== 'private') {
        return;
    }
    console.log(msg);

    // Fetch all users from the database
    const users = await getUsersFromDatabase();

    // Iterate over all users
    for (const user of users) {
        try {
            // Check if the user is in the group
            const memberStatus = await bot.getChatMember(GROUP_ID, user.id);
            console.log("Member status:", memberStatus);

            // If user is in the group, extract their LeetCode username and make API request
            if (memberStatus.status === 'member' || memberStatus.status === 'administrator' || memberStatus.status === 'creator') {
                const leetcodeUsername = user.leetcodeUsername;  // Assuming leetcode username is stored in DB

                // Make API request to get data using LeetCode username
                const response = (await axios.get(`https://leetcode-api-faisalshohag.vercel.app/${leetcodeUsername}`)).data;
                const lastPractice = response.recentSubmissions[0].timestamp;                
                const diffHours = hoursDifference(unixEpochTime, lastPractice);  
                console.log(lastPractice, diffHours);

                if (diffHours <= 24) {
                    await bot.sendMessage(GROUP_ID,`${user.username} has submitted today, keep it up! 🎉`);
                }else{
                    await bot.sendMessage(GROUP_ID,`${user.username} missed to submit.`);
                }

                // Send the message to the group based on the API response
                const message = `Punishment for ${leetcodeUsername}: ${response.data.message}`;
                await bot.sendMessage(GROUP_ID, message);
            }
        } catch (error) {
            // Handle error if user is not in the group or API request fails
            console.error(`Error processing user ${user.id}:`, error);
        }
    }

    await bot.sendMessage(chatId, "Daily report submitted");
}

// Helper function to get all users from the database
async function getUsersFromDatabase() {
    return [
        { id: 5648005817, leetcodeUsername: 'naolfekadu', first_name: 'Naol', last_name: 'Fekadu', username: 'nalonix' },
        // Example of users in the database with their LeetCode usernames
    ];
}


// retyr logic for failed api calls
// debouce for api fetches
// 