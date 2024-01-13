const { register, login, logout } = require("../controllers/login");
const authMiddleware = require("../middlewares/auth");
const checkRoleMiddleware = require("../middlewares/checkRole");

const express = require("express");

const router = express.Router();

router.route("/register").post(register);

router.route("/login").post(login);
router.route("/logout").post(logout);

module.exports = router;