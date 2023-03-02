const express = require("express");
const {
  getProducts,
  newProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const router = express.Router();
const {
  isAuthenticationUser,
  authorizeRoles,
} = require("../middlewares/authenticate");
// router.route('/products').get(isAuthenticationUser,getProducts)
// router.route('/product/new').post(isAuthenticationUser,authorizeRoles('admin'),newProduct)
// router.route('/product/:id').get(isAuthenticationUser,authorizeRoles('admin'),getSingleProduct)
// .put(isAuthenticationUser,authorizeRoles('admin'),updateProduct)
// .delete(isAuthenticationUser,authorizeRoles('admin'),deleteProduct)
router.route("/products").get(getProducts);
router.route("/product/new").post(newProduct);
router
  .route("/product/:id")
  .get(getSingleProduct)
  .put(updateProduct)
  .delete(deleteProduct);

module.exports = router;
