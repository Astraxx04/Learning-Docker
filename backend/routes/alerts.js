const { checkExpiryDates, checkShortage } = require("../controllers/alerts");
const authMiddleware = require("../middlewares/auth");
const checkRoleMiddleware = require("../middlewares/checkRole");

const express = require('express');

const router = express.Router();

router.route("/alerts").post(checkExpiryDates);
router.route("/notifications").post(checkShortage);

module.exports = router;