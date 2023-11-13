const Category = require("../models/categories");
const asyncHandler = require("express-async-handler");

exports.category_list = asyncHandler(async (req, res, next) => {
  const categories = await Category.find({}).exec();
  res.render("categories", {
    title: "Categories",
    categories: categories,
  });
});

exports.category_detail = asyncHandler(async (req, res, next) => {
  const categories = await Category.findById(req.params.id).exec();
  res.render("category_detail", {
    categories: categories,
  })
});
