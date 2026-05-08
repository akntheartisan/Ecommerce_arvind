const { validationResult } = require("express-validator");
const AppError = require("./appError");

exports.validate = (req, res, next) => {
  const error = validationResult(req);

  const errorArray = error.array();

  if (!error.isEmpty()) {
    let errorObj = {};
    errorArray.forEach((eachError) => {
      errorObj[eachError.path] = eachError.msg;
    });

    console.log("errorObj",errorObj)
    throw new AppError(400, "validation failed", errorObj);
  }

  next();
};