const express = require("express");
const {
  createSupplier,
  getSupplier,
  updateSupplier,
  deleteSupplier,
} = require("../controllers/supplierController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();
router
  .route("/admin/supplier/create")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createSupplier);
router
  .route("/admin/supplier")
  .get(isAuthenticatedUser, authorizeRoles("admin", "manager"), getSupplier);
router
  .route("/admin/supplier/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin", "manager"), updateSupplier)
  .delete(
    isAuthenticatedUser,
    authorizeRoles("admin", "manager"),
    deleteSupplier
  );

module.exports = router;
