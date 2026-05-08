const router = require("express").Router();
const uploader = require("../../Middlewares/multer");
const productValidations = require("../../Validators/productValidator");
const { validate } = require("../../Middlewares/validator");
const {
  productAdd,
  productGet,
} = require("../../Controllers/Admin/productController");
const { verifyToken } = require("../../Middlewares/verifyToken");

router
  .route("/")
  .post(
    verifyToken,
    uploader.array("image", 4),
    productValidations,
    validate,
    productAdd,
  );
router.route("/").get(productGet);
// router.route("/").put();
// router.route("/").delete();

module.exports = router;
