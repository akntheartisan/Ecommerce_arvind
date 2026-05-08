const { body } = require("express-validator");

exports.registerValidator = [
  body("username")
    .notEmpty()
    .withMessage("please fill the username")
    .bail()
    .isEmail()
    .withMessage("invalid email")
    .escape(),

  body("phone")
    .notEmpty()
    .withMessage("please fill the phone")
    .bail()
    .isLength({ max: 10 })
    .withMessage("Maximum 10 characters allowed")
    .bail()
    .isMobilePhone("en-IN")
    .withMessage("Invalid Phone Number")
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
