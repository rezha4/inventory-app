const Category = require("../models/categories");
const asyncHandler = require("express-async-handler");

exports.category_list = asyncHandler(async (req, res, next) => {
  res.send("category list not yet implemented");
});

exports.category_detail = asyncHandler(async (req, res, next) => {
  res.send("category detail not yet implemented");
});
