const { createQrCodes } = require("../controllers/qrGenerator");
const authMiddleware = require("../middlewares/auth");
const checkRoleMiddleware = require("../middlewares/checkRole");

const express = require("express");

const router = express.Router();

router.route("/noOfQrCodes").post(createQrCodes);

module.exports = router;
