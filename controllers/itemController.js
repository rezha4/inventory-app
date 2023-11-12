const Item = require("../models/items");
const Category = require("../models/categories");
const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async (req, res, next) => {
  const [
    itemCount,
    categoryCount
  ] = await Promise.all([
    Item.countDocuments({}).exec(),
    Category.countDocuments({}).exec(),
  ]);

  res.render("index", {
    title: "Inventory Home",
    item_count: itemCount,
    category_count: categoryCount,
  });
});

exports.item_list = asyncHandler(async (req, res, next) => {
  res.send("item list not implemented yet");
});

exports.item_detail = asyncHandler(async (req, res, next) => {
  res.send("item detail not implemented yet");
});
