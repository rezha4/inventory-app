const Category = require("../models/categories");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

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
  });
});

exports.category_create_get = (req, res, next) => {
  res.render("category_form");
};

exports.category_create_post = [
  body("name", "Category name can't be empty")
    .trim()
    .isLength({ min: 3 })
    .escape(),

  body("description", "Description can't be empty")
    .trim()
    .isLength({ min: 3 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const category = new Category({
      name: req.body.name,
      description: req.body.description,
    });

    if (!errors.isEmpty()) {
      res.render("genre_form");
      return;
    } else {
      const categoryExist = await Category.findOne({
        name: req.body.name,
      }).exec();
      if (categoryExist) {
        res.redirect(categoryExist.id);
      } else {
        await category.save();
        res.redirect(category.id);
      }
    }
  }),
];
