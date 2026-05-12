const AppError = require("../../Middlewares/appError");
const productModal = require("../../Models/productSchema");
const uploadImage = require("../../Utils/uploadImage");

const productAdd = async (req, res, next) => {
  console.log(req.body);
  console.log(req.files);

  const images = req.files;
  try {
    const productImagePromises = images.map((each) => uploadImage(each.buffer));
    const productImages = await Promise.all(productImagePromises);

    req.body = { ...req.body, image: productImages };

    const response = await productModal.create(req.body);
    console.log("response", response);

    res.json({
      success: true,
      message: "product added",
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

const productGet = async (req, res, next) => {
  try {
    const response = await productModal.find();

    if (response.length === 0) {
      throw new AppError(400, "No Products to Show");
    }

    return res.status(200).json(response);
  } catch (error) {
    return next(error);
  }
};

module.exports = { productAdd, productGet };
