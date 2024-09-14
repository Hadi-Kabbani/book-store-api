const express = require("express");
const userController = require("../controllers/userController");
const authenticate = require("../middlewares/authenticate");
const authorize = require("../middlewares/authorize");
const { query } = require("../middlewares/query");
const User = require("../models/userModel.js");
const { passwordValidationMiddleware, userValidationMiddleware, validateUserId, registerValidationMiddleware } = require("../middlewares/validation");

const router = express.Router();

router.use(authenticate);

router.post("/", authorize("admin"), registerValidationMiddleware, userController.createUser);
router.get("/", authorize("admin"), query(User), userController.getAllUsers);
router.get("/:id", validateUserId, userController.getUserById);
router.patch("/update-password", passwordValidationMiddleware, userController.updatePassword);
router.patch("/:id", validateUserId, userValidationMiddleware, userController.updateUser);
router.delete("/:id", validateUserId, userController.deleteUser);

module.exports = router;
