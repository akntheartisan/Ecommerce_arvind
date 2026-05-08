const AppError = require("../../Middlewares/appError");
const adminLoginModel = require("../../Models/adminSchema");
const generateToken = require("../../Utils/tokenGenerate");

exports.login = async (req, res, next) => {
  const { username, password } = req.body;
  console.log(req.body);

  try {
    const response = await adminLoginModel
      .findOne({ username })
      .select("password");

    if (!response) {
      throw new AppError(400, "check the username");
    }

    const isPasswordCorrect = response.password === password;

    if (!isPasswordCorrect) {
      throw new AppError(401, "check the password");
    }

    const { accessToken, refreshToken } = generateToken(response);

    response.refreshToken = refreshToken;
    response.save();

    return res
      .status(200)
      .cookie("adminAccessToken", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .cookie("adminRefreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "none",
      })
      .json({ message: "success" });
  } catch (error) {
    return next(error);
  }
};

exports.adminTokenCreation = async (req, res, next) => {
  const { user } = req;
  console.log("userCheck", user);

  try {
    const { accessToken, refreshToken } = generateToken(user.username);

    const response = await loginModel.findOne({ username: user.username });
    response.refreshToken = refreshToken;
    response.save();

    return res
      .status(200)
      .cookie("adminAccessToken", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .cookie("adminRefreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "none",
      })
      .json({ message: "success" });
  } catch (error) {
    return next(error);
  }
};
