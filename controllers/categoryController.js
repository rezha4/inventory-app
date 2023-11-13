const Category = require("../models/categories");
const asyncHandler = require("express-async-handler");

exports.category_list = asyncHandler(async (req, res, next) => {
  const categories = await Category.find({}).exec();
  console.log(categories);
  res.render("categories", {
    title: "Categories",
    categories: categories,
  });
});

exports.category_detail = asyncHandler(async (req, res, next) => {
  res.send("category detail not yet implemented");
});
