const express = require ('express');
const { registerUser, loginUser, logoutUser ,forgotPassword, getUserProfile, changePassword, updateProfile, getAllUser, getUser, updateUser, deleteUser} = require('../controllers/authController');
const router = express.Router();

const {
    isAuthenticationUser, authorizeRoles} = require("../middlewares/authenticate");

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').post(logoutUser);
router.route('/password/forgot').post(forgotPassword);
router.route('/Profile').get(isAuthenticationUser,getUserProfile);
router.route('/password/change').put(isAuthenticationUser,changePassword);
router.route('/update').put(isAuthenticationUser,updateProfile);


// Admin routes

router.route('/admin/user').get(isAuthenticationUser,authorizeRoles("admin"),getAllUser);
router.route('/admin/user/:id').get(isAuthenticationUser,authorizeRoles("admin"),getUser)
.put(isAuthenticationUser,authorizeRoles("admin"),updateUser).delete(isAuthenticationUser,authorizeRoles("admin"),deleteUser);

module.exports = router;
