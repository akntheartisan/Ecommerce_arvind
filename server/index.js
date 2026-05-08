require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const { connection } = require("mongoose");

//importing configs and middlewares
const configCloudinary = require("./Config/Cloudinary");
const {
  appEnvs: { port },
} = require("./Config/env");
const connectDB = require("./Config/DB");

const errorHandler = require("./Middlewares/errorHandling");

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://ecommerce-arvind-client.vercel.app"
];

app.use(
  cors({
    origin: function (origin, cb) {
      if (!origin) return cb(null, true);

      if (allowedOrigins.includes(origin)) {
        return cb(null, true);
      }

      return cb(new Error("Blocked by CORS"));
    },
    methods: ["GET", "POST", "DELETE", "PATCH"],
    credentials: true,
  }),
)

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

//importing routes
const userRoute = require("./Route/userRoute");
const productRoute = require("./Route/Admin/productRoute");

//connecting DB
connectDB();

//routes
app.get("/", (req, res) => {
  res.send("Hello from genesys api!");
});

app.use("/user",userRoute)
app.use("/product", productRoute);

//error middlewares
app.use(errorHandler);

//running server
connection.on("connected", () => {
  app.listen(port, () => {
    configCloudinary();
    console.log(`Server is running on port ${port}`);
  });
});
