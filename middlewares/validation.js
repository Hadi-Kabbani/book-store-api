const { body, validationResult, param } = require("express-validator");

const registerValidationMiddleware = [
    body("email")
        .isEmail()
        .withMessage("Please enter a valid email address")
        .notEmpty()
        .withMessage("Email is required"),
    body("password")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters long")
        .matches(/[A-Z]/)
        .withMessage("Password must contain at least one uppercase letter")
        .matches(/[a-z]/)
        .withMessage("Password must contain at least one lowercase letter")
        .matches(/[0-9]/)
        .withMessage("Password must contain at least one digit")
        .matches(/[@$!%*?&]/)
        .withMessage("Password must contain at least one special character")
        .notEmpty()
        .withMessage("Password is required"),

    body("firstName")
        .isAlpha()
        .withMessage("First name must contain only letters")
        .notEmpty()
        .withMessage("First name is required"),

    body("lastName")
        .isAlpha()
        .withMessage("Last name must contain only letters")
        .notEmpty()
        .withMessage("Last name is required"),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
]

const userValidationMiddleware = [
    body("email")
        .isEmail()
        .withMessage("Please enter a valid email address")
        .notEmpty()
        .withMessage("Email is required"),

    body("firstName")
        .isAlpha()
        .withMessage("First name must contain only letters")
        .notEmpty()
        .withMessage("First name is required"),

    body("lastName")
        .isAlpha()
        .withMessage("Last name must contain only letters")
        .notEmpty()
        .withMessage("Last name is required"),

    body("gender")
        .optional()
        .isIn(["male", "female", "other"])
        .withMessage("Gender must be either male, female, or other"),

    body("weight")
        .optional()
        .isFloat({ min: 0 })
        .withMessage("Weight must be a positive number"),

    body("height")
        .optional()
        .isFloat({ min: 0 })
        .withMessage("Height must be a positive number"),

    body("dateOfBirth")
        .optional()
        .isISO8601()
        .withMessage("Date of Birth must be a valid date"),

    body("profileImage")
        .optional()
        .isURL()
        .withMessage("Profile image must be a valid URL"),

    body("role")
        .optional()
        .isIn(["regular", "premium", "admin"])
        .withMessage("Role must be either regular, premium, or admin"),

    body("subscriptionStatus")
        .optional()
        .isIn(["free", "premium"])
        .withMessage("Subscription status must be either free or premium"),

    body("passwordChangedAt")
        .optional()
        .isISO8601()
        .withMessage("Password changed date must be a valid date"),

    body("passwordResetToken")
        .optional()
        .isUUID()
        .withMessage("Password reset token must be a valid UUID"),

    body("passwordResetExpires")
        .optional()
        .isISO8601()
        .withMessage("Password reset expiration date must be a valid date"),

    // Middleware to check validation results
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

const validateUserId = [
    param("id")
        .isMongoId()
        .withMessage("Invalid user ID"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

const passwordValidationMiddleware = [
    body("password")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters long")
        .matches(/[A-Z]/)
        .withMessage("Password must contain at least one uppercase letter")
        .matches(/[a-z]/)
        .withMessage("Password must contain at least one lowercase letter")
        .matches(/[0-9]/)
        .withMessage("Password must contain at least one digit")
        .matches(/[@$!%*?&]/)
        .withMessage("Password must contain at least one special character")
        .notEmpty()
        .withMessage("Password is required"),

    // Middleware to check validation results
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

module.exports = {
    userValidationMiddleware,
    passwordValidationMiddleware,
    registerValidationMiddleware,
    validateUserId
};
