require("dotenv").config(); // Load environment variables
const app = require("./server/server");
require("./bot/bot"); // Initialize the bot

const User = require("./db/models/user.model");

const { connectToDatabase } = require("./db");

const port = 3000;

app.listen(port, async () => {
    console.log(`Server running at http://localhost:${port}`);
    await connectToDatabase();
    
    const users = await User.find();
    console.log("Sample users:", users);

});
