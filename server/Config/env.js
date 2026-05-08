const {
  PORT,
  DB_CONNECTION_URI,
  CLOUDINARY_APP_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
} = process.env;

const appEnvs = {
  port: PORT,
  db: DB_CONNECTION_URI,
  cloudinary_app: CLOUDINARY_APP_NAME,
  cloudinary_api_key: CLOUDINARY_API_KEY,
  cloudinary_api_secret: CLOUDINARY_API_SECRET,
};

module.exports = { appEnvs };
