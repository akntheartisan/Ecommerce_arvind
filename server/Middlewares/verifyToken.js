const jwt = require("jsonwebtoken");
const AppError = require("./appError");
const userlogin = require("../Models/userSchema");
const adminLogin = require("../Models/adminSchema");

exports.verifyToken = async (req, res, next) => {
  const token = req.cookies.taylorAccessToken || req.cookies.adminAccessToken;
  const modal = req.cookies.adminAccessToken ? adminLogin : userlogin;

  try {
    if (!token) {
      throw new AppError(401, "Token not found,please login");
    }

    const tokenAccessVerify = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET,
    );

    const query = req.cookies.adminAccessToken
      ? {
          username: tokenAccessVerify.username,
          admin: true,
        }
      : { username: tokenAccessVerify.username };

    let userCheck = await modal.findOne(query);

    if (!userCheck) {
      throw new AppError(401, "User not found, unauthorised");
    }
    next();
  } catch (error) {
    console.log(error);

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    }

    if (error.name === "NotBeforeError") {
      return res.status(401).json({ message: "Token not active" });
    }

    return next(error);
  }
};
