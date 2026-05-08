const { v2: cloudinary } = require("cloudinary");
const { Readable } = require("node:stream");

function uploadImage(fileBuffer) {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "products",
        overwrite: true,
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve({ id: result.public_id, url: result.secure_url });
        }
      },
    );

    Readable.from(fileBuffer).pipe(uploadStream);
  });
}

module.exports = uploadImage;
