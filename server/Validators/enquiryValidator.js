const { body } = require("express-validator");

const user_name = body("user_name")
  .trim()
  .notEmpty()
  .withMessage("user name can't be empty")
  .isLength({ max: 100 })
  .withMessage("Maximum 100 characters allowed")
  .escape();

const user_email = body("user_email")
  .trim()
  .notEmpty()
  .withMessage("email can't be empty")
  .isEmail()
  .withMessage("invalid email")
  .isLength({ max: 50 })
  .withMessage("Maximum 50 character allowed")
  .escape();

const user_phone = body("user_phone")
  .trim()
  .isNumeric()
  .withMessage("Phone number should be a number")
  .notEmpty()
  .withMessage("Phone number can't be empty")
  .isMobilePhone("en-IN")
  .withMessage("Invalid phone number")
  .escape();

const enquiry = body("enquiry")
  .trim()
  .notEmpty()
  .withMessage("enquiry can't be empty")
  .isLength({ max: 100 })
  .withMessage("Maximum 100 characters allowed")
  .escape();

const requested_service = body("requested_service")
  .trim()
  .notEmpty()
  .withMessage("request service can't be empty")
  .isLength({ max: 100 })
  .withMessage("Maximum 100 characters allowed")
  .escape();

const enquiryValidations = [
  user_name,
  user_email,
  user_phone,
  enquiry,
  requested_service,
];

module.exports = enquiryValidations;
