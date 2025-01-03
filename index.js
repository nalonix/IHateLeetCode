require("dotenv").config(); // Load environment variables
const app = require("./server/server");
require("./bot/bot"); // Initialize the bot

const port = 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
