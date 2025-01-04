const axios = require("axios");
const { hoursDifference, dateToUnixEpoch } = require("../../utils/helpers");
const { getAllUsers, updateMissedCount } = require("../../utils/database");
const GROUP_ID = process.env.GROUP_ID;

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

module.exports = async (bot, msg) => {
    const date = new Date();
    const unixEpochTime = dateToUnixEpoch(date);
    let reportMessage = `📊 Daily report for ${date.toDateString()}:\n`;

    const chatId = msg.chat.id;
    const type = msg.chat.type;

    if (type !== "private" || msg.from.id != process.env.ADMIN_ID) {
        return;
    }

    // Fetch all users from the database
    let users = await getAllUsers();

    // Iterate over all users
    for (const user of users) {
        try {
            // Check if the user is in the group
            const memberStatus = await bot.getChatMember(GROUP_ID, user.id);
            // console.log("Member status:", memberStatus);

            // If user is in the group, extract their LeetCode username and make API request
            if (
                memberStatus.status === "member" ||
                memberStatus.status === "administrator" ||
                memberStatus.status === "creator"
            ) {
                const leetcodeUsername = user.leetcodeUsername;

                // Debounced API request to get data using LeetCode username
                await delay(500); // Add a 500ms delay between requests
                const response = (
                    await axios.get(
                        `https://leetcode-api-faisalshohag.vercel.app/${leetcodeUsername}`
                    )
                ).data;

                const lastPractice = response.recentSubmissions[0].timestamp;
                const diffHours = hoursDifference(unixEpochTime, lastPractice);

                if (diffHours <= 24) {
                    reportMessage += `@${user.username} has submitted today. 🎉 MC${user.missedCount} \n`;
                } else {
                    const punishedUser = await updateMissedCount(user.id);
                    reportMessage += `@${user.username} missed to submit. MC${punishedUser.missedCount}\n`;
                }
            }
        } catch (error) {
            // Handle error if user is not in the group or API request fails
            console.error(`Error processing user ${user.id}:`, error.message);
            await bot.sendMessage(chatId, `Error processing user ${user.id}:`);
        }
    }

    await bot.sendMessage(GROUP_ID, reportMessage);
    await bot.sendMessage(chatId, "Daily report submitted");
};



// debouce for api fetches
