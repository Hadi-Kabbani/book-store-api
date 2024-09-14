const bcrypt = require('bcrypt');

// Function to hash a password
async function hashPassword(password) {
    const hashedPassword = await bcrypt.hash(password, 12);
    return hashedPassword;
}

// Function to compare a password with a hashed password
async function comparePassword(plainPassword, hashedPassword) {
    const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
    return isMatch;
}

module.exports = { hashPassword, comparePassword };
