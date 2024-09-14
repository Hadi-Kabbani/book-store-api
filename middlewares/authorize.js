const authorize = (...roles) => {
    return (req, res, next) => {
        // Check if user role is allowed
        if (roles.length && !roles.includes(req.user.role)) {
            return res.status(403).json({ error: 'Access denied' });
        }
        // Proceed if the user role is allowed
        next();
    };
};

module.exports = authorize;
