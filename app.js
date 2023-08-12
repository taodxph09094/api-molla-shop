const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const path = require("path");
const cors = require("cors");

const errorMiddleware = require("./middleware/error");

// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "config/config.env" });
}

const corsOptions = {
  // origin: "*",
  origin: ["http://localhost:3000", "http://localhost:3001"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
  allowedMethods: ["GET", "POST", "PUT", "DELETE"],
  optionSuccessStatus: 200,
};

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(fileUpload());
app.use(cors(corsOptions));
// Route Imports

const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
const payment = require("./routes/paymentRoute");
const orderSystem = require("./routes/orderSystemRoute");
const coupon = require("./routes/couponRoute");
const brand = require("./routes/brandRoute");
const supplier = require("./routes/supplierRoute");
const categories = require("./routes/categoriesRoute");
const banner = require("./routes/bannerRoute");
const feedback = require("./routes/feedbackRoute");
const newFeed = require("./routes/newFeedRoute");
const statistical = require("./routes/statisticalRoute");

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);
app.use("/api/v1", orderSystem);
app.use("/api/v1", coupon);
app.use("/api/v1", brand);
app.use("/api/v1", banner);
app.use("/api/v1", feedback);
app.use("/api/v1", newFeed);
app.use("/api/v1", statistical);
app.use("/api/v1", supplier);
app.use("/api/v1", categories);
// Middleware for Errors
app.use(errorMiddleware);

module.exports = app;
