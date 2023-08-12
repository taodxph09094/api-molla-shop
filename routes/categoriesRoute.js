const express = require("express");
const {
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoriesController");

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();
router
  .route("/admin/categories/create")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createCategory);
router.route("/admin/categories").get(getCategory);
router
  .route("/admin/categories/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin", "manager"), updateCategory)
  .delete(
    isAuthenticatedUser,
    authorizeRoles("admin", "manager"),
    deleteCategory
  );

module.exports = router;
