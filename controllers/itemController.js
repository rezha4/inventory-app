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
  const items = await Item.find({}).populate("category").exec();
  res.render("items", {
    title: "All Items",
    items: items,
  })
});

exports.item_detail = asyncHandler(async (req, res, next) => {
  const item = await Item.findById(req.params.id).populate("category").exec();
  res.render("item_detail", {
    item: item,
  })
});
