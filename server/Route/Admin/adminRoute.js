const express = require("express");
const router = express.Router();
const { login } = require("../../Controllers/Admin/loginController");
const { loginValidator } = require("../../Validators/loginValidator");
const { validate } = require("../../Middlewares/validator");
const { verifyToken } = require("../../Middlewares/verifyToken");
const { refreshToken } = require("../../Middlewares/refreshToken");
const {
  adminTokenCreation,
} = require("../../Controllers/Admin/loginController");

router.route("/login").post(loginValidator, validate, login);
router.route("/verify").get(verifyToken, (req, res) => {
  return res.status(200).json({ message: "success" });
});
router.route("/refresh").get(refreshToken, adminTokenCreation);

module.exports = router;
