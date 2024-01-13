const { categoryGraph } = require("../controllers/chart");
const authMiddleware = require("../middlewares/auth");
const checkRoleMiddleware = require("../middlewares/checkRole");

const express = require('express');

const router = express.Router();

router.route("/categoryGraph").post(categoryGraph);

module.exports = router;