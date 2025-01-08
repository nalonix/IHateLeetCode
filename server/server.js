const express = require("express");
const app = express();

app.get("/", (req, res) => {
    console.log("🟩 Bot is alive")
    res.send("Bot is alive");
});

module.exports = app;
