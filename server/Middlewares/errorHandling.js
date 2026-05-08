const { MulterError } = require("multer");
const AppError = require("./appError");

const errorHandler = (error, req, res, next) => {
  console.log("errorhandler-error", error);

  if (error instanceof AppError) {
    return res
      .status(error.statusCode)
      .json({ message: error.message, validationError: error.error });
  }

  if (error instanceof MulterError) {
    if (error.code === "LIMIT_UNEXPECTED_FILE") {
      return res.status(403).json({
        message: "number of files exceeded max file count",
      });
    }
    return res.status(403).json({
      message: error.code,
    });
  }

  return res.status(500).json({
    message: "Internal Server Error",
  });
};

module.exports = errorHandler;
