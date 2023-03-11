const express = require("express");
const router = express.Router();

const {
  newOrder,
  getSingleOrder,
  myorders,
  orders,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");

const {
  isAuthenticationUser,
  authorizeRoles,
} = require("../middlewares/authenticate");

router.route("/order/new").post(isAuthenticationUser, newOrder);
router.route("/order/:id").get(isAuthenticationUser, getSingleOrder);
router.route("/myorders").get(isAuthenticationUser, myorders);

// Admin routes

router
  .route("/orders")
  .get(isAuthenticationUser, authorizeRoles("admin"), orders);
router.route("/order/:id").put(isAuthenticationUser, authorizeRoles("admin"), updateOrder);
router.route("/order/:id").delete(isAuthenticationUser, authorizeRoles("admin"), deleteOrder);

module.exports = router;
