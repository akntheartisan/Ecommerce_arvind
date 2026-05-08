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

//middlewares
app.use(
  cors({
    origin: function (origin, cb) {
      if (!origin || origin.includes("localhost")) {
        cb(null, origin);
        return;
      }

      cb(new Error("Block by CORS"), null);
    },
    methods: ["GET", "POST", "DELETE", "PATCH"],
    optionsSuccessStatus: 200,
    credentials: true,
  }),
);

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
