// create mongoose model for user
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    id: {
        type: Number,
        unique: true,
        required: true,
    },
    leetcodeUsername: {
        type: String,
        required: true,
    },
    first_name: {
        type: String,
    },
    last_name: {
        type: String,
    },
    username: {
        type: String,
    },
    missedCount: {
        type: Number,
        default: 0,
    },
});

module.exports = mongoose.model("User", userSchema);
