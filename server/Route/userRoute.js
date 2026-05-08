const router = require("express").Router();
const { loginValidator } = require("../Validators/loginValidator");
const { validate } = require("../Middlewares/validator");
const {
  userSignUp,
  userSignIn,
  cartAdd,
} = require("../Controllers/userController");
const { verifyToken } = require("../Middlewares/verifyToken");
const { refreshToken } = require("../Middlewares/refreshToken");
const { userTokenCreation } = require("../Controllers/userController");
const { registerValidator } = require("../Validators/registerValidator");

router.route("/signup").post(registerValidator, validate, userSignUp);
router.route("/signin").post(loginValidator, validate, userSignIn);
router.route("/verify").get(verifyToken, (req, res) => {
  return res.status(200).json({ message: "success" });
});
router.route("/refresh").get(refreshToken, userTokenCreation);
router.route("/cartAdd").post(verifyToken, cartAdd);

module.exports = router;
