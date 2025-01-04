const User = require("../db/models/user.model");

async function getAllUsers() {
    const users = await User.find();
    return users;
}

async function getUserById(id) {
    const user = await User.findOne({ id });
    return user;
}

async function createUser(user) {
    const newUser = await User.create(user);
    return newUser;
}

async function updateUser(id, user) {
    const updatedUser = await User.findOneAndUpdate({ id }, user, { new: true });
    return updatedUser;
}

async function updateMissedCount(userId) {
    const updatedUser = await User.findOneAndUpdate({ id: userId }, { $inc: { missedCount: 1 } }, { new: true });
    return updatedUser;
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    updateMissedCount,
};