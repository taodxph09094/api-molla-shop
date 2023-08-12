const mongoose = require("mongoose");
const bannerSchema = new mongoose.Schema({
  imageBanner: {
    type: String,
    required: [true, "Chọn ảnh"],
  },
  titleMain: {
    type: String,
    required: ["Nhập tiêu đề"],
  },
  titleDesc: {
    type: String,
    required: ["Nhập tiêu đề"],
  },
  promotion: {
    type: String,
    required: ["Nhập khuyến mãi"],
  },
  description: {
    type: String,
    required: ["Nhập mô tả"],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("Banner", bannerSchema);
