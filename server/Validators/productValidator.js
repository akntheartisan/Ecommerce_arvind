const { body } = require("express-validator");
const uploader = require("../Middlewares/multer");

uploader.array("product_images", 4);
const ALLOWED_FILE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
const ALLOWED_FILE_SIZE = 1024 * 1024 * 2;

const title = body("title")
  .trim()
  .notEmpty()
  .withMessage("product title can't be empty")
  .bail()
  .isAlpha("en-IN", { ignore: " " })
  .withMessage("Alphabets only")
  .bail()
  .isLength({ max: 100 })
  .withMessage("Maximum 100 characters allowed")
  .escape();

const type = body("type")
  .trim()
  .notEmpty()
  .withMessage("product type can't be empty")
  .bail()
  .isAlpha("en-IN", { ignore: " " })
  .withMessage("Alphabets only")
  .bail()
  .isLength({ max: 100 })
  .withMessage("Maximum 100 characters allowed")
  .escape();

const description = body("description")
  .trim()
  .notEmpty()
  .withMessage("product description can't be empty")
  .isLength({ max: 300 })
  .withMessage("Maximum 300 characters allowed")
  .escape();

const rate = body("rate")
  .trim()
  .notEmpty()
  .withMessage("product rate can't be empty")
  .bail()
  .isNumeric()
  .withMessage("only numbers are allowed")
  .bail()
  .isLength({ max: 5 })
  .withMessage("Maximum 5 characters allowed")
  .escape();

const discount = body("discount")
  .trim()
  .notEmpty()
  .withMessage("product discount can't be empty")
  .bail()
  .isNumeric()
  .withMessage("only numbers are allowed")
  .bail()
  .isLength({ max: 2 })
  .withMessage("Maximum 2 characters allowed")
  .escape();

const quantity = body("quantity")
  .trim()
  .notEmpty()
  .withMessage("product quantity can't be empty")
  .bail()
  .isNumeric()
  .withMessage("only numbers are allowed")
  .escape();

const image = body("image").custom((_, { req }) => {
  const images = req.files;

  const alreadyUploadedImages = req.body.old_product_images;
  //   console.log("already existed images",alreadyUploadedImages);

  //   console.log("image from validator", images);

  if (!alreadyUploadedImages && (!images || images.length === 0)) {
    throw new Error("At least one product image is required");
  }

  if (alreadyUploadedImages && alreadyUploadedImages.length === 0) {
    throw new Error("Cannot remove all images from product!");
  }

  if (images) {
    images.forEach((image) => {
      const image_mimetype = image.mimetype;
      const image_size = image.size;

      //   console.log("image mime type:", image_mimetype);
      //   console.log("image size:", image_size);

      if (!ALLOWED_FILE_TYPES.includes(image_mimetype)) {
        throw new Error("Invalid image type, Only jpeg,jpg,png,webp allowed");
      }

      if (image_size > ALLOWED_FILE_SIZE) {
        throw new Error("Image size exceeds the limit of 2MB");
      }
    });
    return true;
  }
  return true;
});

const productValidations = [
  title,
  type,
  description,
  rate,
  discount,
  quantity,
  image,
];

module.exports = productValidations;
