const { body } = require("express-validator");

exports.loginValidator = [
  body("username")
    .notEmpty()
    .withMessage("please fill the username")
    .bail()
    .isEmail()
    .withMessage("invalid email")
    .escape(),

  body("password")
    .notEmpty()
    .withMessage("please fill the password")
    .bail()
    .matches(/^(?=.*[a-z])(?=.*\d).{8,}$/)
    .withMessage(
      "password must contain 8 characters 1 alphanumeric & 1 special characters",
    )
    .escape(),
];
