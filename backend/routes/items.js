const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth");
const checkRoleMiddleware = require("../middlewares/checkRole");

const {
  getAllItems,
  getItem,
  insertNewItem,
  updateItem,
  deleteItem,
} = require("../controllers/items");

// router.route("/").get(authMiddleware, checkRoleMiddleware("admin"), getAllItems);

router
  .route("/")
  .get(authMiddleware, checkRoleMiddleware("admin"), getAllItems);
router.route("/:id").get(authMiddleware, getItem);
router
  .route("/update/:id")
  .patch(
    authMiddleware,
    checkRoleMiddleware("admin"),
    checkRoleMiddleware("teacher"),
    updateItem
  );
router
  .route("/insert")
  .post(authMiddleware, checkRoleMiddleware("admin"), insertNewItem);
router.route("/delete/:id").delete(authMiddleware, deleteItem);

module.exports = router;
