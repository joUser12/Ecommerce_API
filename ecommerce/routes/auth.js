const express = require ('express');
const { registerUser, loginUser, logoutUser ,forgotPassword, getUserProfile} = require('../controllers/authController');
const router = express.Router();

const {
    isAuthenticationUser, } = require("../middlewares/authenticate");

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').post(logoutUser);
router.route('/password/forgot').post(forgotPassword);
router.route('/Profile').get(isAuthenticationUser,getUserProfile);

module.exports = router;