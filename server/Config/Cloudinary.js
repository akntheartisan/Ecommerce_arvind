const { v2: cloudinary } = require("cloudinary");
const { appEnvs } = require("./env");

const { cloudinary_app, cloudinary_api_key, cloudinary_api_secret } = appEnvs;

function configCloudinary() {
  cloudinary.config({
    cloud_name: cloudinary_app,
    api_key: cloudinary_api_key,
    api_secret: cloudinary_api_secret,
  });
  console.log("Cloudinary Connected!")
}

module.exports = configCloudinary;
