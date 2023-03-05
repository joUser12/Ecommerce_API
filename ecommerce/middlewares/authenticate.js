const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("./catchAyncError");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

exports.isAuthenticationUser = catchAsyncError(async (req, res, next) => {
  console.log(req);
    // const {token } = req.cookies;
  // //   const { token } = req.authorization;
  // postman
  // const token = req.rawHeaders[1].slice(7)
  // angular
  const token = req.rawHeaders[11].slice(7)
  // console.log(token,req.cookies);

  if (!token) {
    return next(new ErrorHandler("login first to handle this route"));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decoded.id);
  next();
});

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(`Role ${req.user.role} is not allowed`, 401)
      );
    }
    next();
  };
};
