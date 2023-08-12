const Supplier = require("../models/supplierModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");

//create
exports.createSupplier = catchAsyncErrors(async (req, res, next) => {
  req.body.user = req.user.id;
  const supplier = await Supplier.create(req.body);
  res.status(201).json({
    success: true,
    supplier,
  });
});

// Get All
exports.getSupplier = catchAsyncErrors(async (req, res, next) => {
  const apiFeature = new ApiFeatures(Supplier.find(), req.query).search();

  let supplier = await apiFeature.query;
  supplier = await apiFeature.query;
  res.status(200).json({
    success: true,
    supplier,
  });
});
// update
exports.updateSupplier = catchAsyncErrors(async (req, res, next) => {
  const newData = {
    name: req.body.name,
    address: req.body.address,
  };
  const supplier = await Supplier.findById(req.params.id, newData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    supplier,
  });
});

// Delete Orders

exports.deleteSupplier = catchAsyncErrors(async (req, res, next) => {
  const supplier = await Supplier.findById(req.params.id);

  if (!supplier) {
    return next(new ErrorHander("Không tìm thấy nhà phân phối", 404));
  }
  await supplier.remove();

  res.status(200).json({
    success: true,
    message: "Xóa nhà phân phối thành công !",
  });
});
