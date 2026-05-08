const multer = require("multer");

const storage = multer.memoryStorage();

const fileSaver = multer({
  storage,
  fileFilter: function (req, file, cb) {
    console.log("multerfile",file);
    
    const fileType = file.mimetype;
    if (
      fileType === "image/jpeg" ||
      fileType === "image/jpg" ||
      fileType === "image/png" ||
      fileType === "image/webp"
    ) {
      return cb(null, true);
    }
    cb(new Error("Invalid file type"), false);
  },
  limits: {
    fileSize: 1024 * 1024 * 2, //2 MB
  },
});

module.exports = fileSaver;
