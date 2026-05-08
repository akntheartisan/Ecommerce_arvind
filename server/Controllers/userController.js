const userLoginModel = require("../Models/userSchema");
const cartModel = require("../Models/cartData");
const productModel = require("../Models/productSchema");
const bcrypt = require("bcrypt");
const generateToken = require("../Utils/tokenGenerate");
const AppError = require("../Middlewares/appError");

exports.userSignUp = async (req, res, next) => {
  const { username, password, name, phone } = req.body;
  console.log(req.body);
  try {
    const checkExistingUser = await userLoginModel.findOne({ username });

    if (checkExistingUser) {
      throw new AppError(400, "user already registered");
    }

    const userCreate = await new userLoginModel({
      username,
      password: await bcrypt.hash(password, 12),
      name,
      phone,
    });

    const { accessToken, refreshToken } = generateToken(username);
    userCreate.refreshToken = refreshToken;
    userCreate.save();

    return res
      .status(200)
      .cookie("taylorAccessToken", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .cookie("taylorRefreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .json({ message: "success" });
  } catch (error) {
    return next(error);
  }
};

exports.userSignIn = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const checkUser = await userLoginModel
      .findOne({ username: username.toLowerCase() })
      .select("+password");

    console.log(checkUser)

    const checkPassword = await bcrypt.compare(password, checkUser.password);

    if (!checkPassword) {
      throw new AppError(400, "Incorrect password.Please try again");
    }

    const { accessToken, refreshToken } = generateToken(username);

    res
      .status(200)
      .cookie("taylorAccessToken", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .json({ id:checkUser._id });
  } catch (error) {
    return next(error);
  }
};

exports.userTokenCreation = async (req, res, next) => {
  const { user } = req;
  console.log("userCheck", user);

  try {
    const { accessToken, refreshToken } = generateToken(user.username);

    const response = await userLoginModel.findOne({ username: user.username });
    response.refreshToken = refreshToken;
    response.save();

    return res
      .status(200)
      .cookie("taylorAccessToken", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .cookie("taylorRefreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "none",
      })
      .json({ message: "success" });
  } catch (error) {
    return next(error);
  }
};

exports.cartAdd = async (req, res, next) => {
  const { userId, cartArray } = req.body;
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    await cartModel.updateOne(
      { userId },
      { $push: { cartDetails: { $each: cartArray } } },
      { upsert: true, session },
    );
    const bulkQtyUpdate = cartArray.map(({ productId, quantity }) => ({
      updateOne: {
        $filter: { _id: productId },
        update: { $inc: -quantity },
      },
    }));

    await productModel.bulkWrite(bulkQtyUpdate, { session });

    await session.commitTransaction();
    res.status(200).json({ message: "Order placed successfully" });
  } catch (error) {
    session.abortTransaction();
    return next(error);
  } finally {
    session.endSession();
  }
};
