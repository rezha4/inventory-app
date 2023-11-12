const Item = require("../models/items");
const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async (req, res, next) => {
  res.send("Home page not implemented");
});

exports.item_list = asyncHandler(async (req, res, next) => {
  res.send("item list not implemented yet");
});

exports.item_detail = asyncHandler(async (req, res, next) => {
  res.send("item detail not implemented yet");
});
