const jwt = require("jsonwebtoken");
const AppError = require("./appError");
const userlogin = require("../Models/userSchema");
const adminLogin = require("../Models/adminSchema");

exports.refreshToken = async (req, res, next) => {
  const token = req.cookies.taylorVerifyToken || req.cookies.adminVerifyToken;
  const modal = req.cookies.adminVerifyToken ? adminLogin : userlogin;
  const query = req.cookies.adminVerifyToken
    ? {
        username: refreshVerify.username,
        admin: true,
      }
    : { username: refreshVerify.username };

  try {
    if (!token) {
      throw new AppError(401, "logout");
    }

    const refreshVerify = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

    let userCheck = await modal.findOne(query);

    if (!userCheck) {
      throw new AppError(401, "logout");
    }
    req.user = userCheck;
    next();
  } catch (error) {
    console.log(error);

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "logout" });
    }

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "logout" });
    }

    if (error.name === "NotBeforeError") {
      return res.status(401).json({ message: "logout" });
    }

    return next(error);
  }
};
