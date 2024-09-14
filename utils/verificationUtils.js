const verificationCodes = new Map();

// Function to generate a verification code
exports.generateVerificationCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString(); // 6 digits
};

// Function to store a verification code
exports.storeVerificationCode = (email, code) => {
    verificationCodes.set(email, {
        code,
        expiresAt: Date.now() + 5 * 60 * 1000, // 5 minutes
    });
};

// Function to validate a verification code
exports.validateVerificationCode = (email, code) => {
    const storedCodeData = verificationCodes.get(email);
    if (!storedCodeData) {
        return false;
    }
    if (storedCodeData.code !== code || storedCodeData.expiresAt < Date.now()) {
        return false;
    }
    verificationCodes.delete(email);
    return true;
};
