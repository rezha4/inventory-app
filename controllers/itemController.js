const Item = require("../models/items");
const Category = require("../models/categories");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.index = asyncHandler(async (req, res, next) => {
  const [itemCount, categoryCount] = await Promise.all([
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
  });
});

exports.item_detail = asyncHandler(async (req, res, next) => {
  const item = await Item.findById(req.params.id).populate("category").exec();
  res.render("item_detail", {
    item: item,
  });
});

exports.item_create_get = asyncHandler(async (req, res, next) => {
  const category = await Category.find().exec();
  res.render("item_form", {
    title: "Create Item",
    category: category
  })
});

exports.item_create_post = [
  (req, res, next) => {
    if (!(req.body.category instanceof Array)) {
      if (typeof req.body.category === "undefined") req.body.category = [];
      else req.body.category = new Array(req.body.category);
    }
    next();
  },

  body("name", "Name cannot be empty").trim().isLength({ min: 3 }).escape(),
  body("description", "Description cannot be empty")
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body("category.*").escape(),
  body("price", "Price can't be 0").trim().isNumeric().escape(),
  body("stock", "Stock can't be 0").trim().isNumeric().escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const item = new Item({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      stock: req.body.stock,
    });

    if (!errors.isEmpty()) {
      const category = await Category.find({}).exec();
      res.render("item_form", {
        title: "Create Item",
        name: item.name,
        description: item.description,
        category: category,
        price: item.price,
        stock: item.stock,
      });
    } else {
      await item.save();
      res.redirect(item.id);
    }
  }),
];

exports.item_delete_get = asyncHandler(async (req, res, next) => {
  const item = await Item.findById(req.params.id).exec();

  if (item === null) {
    res.redirect("/catalog/items");
  }

  res.render("item_delete", {
    title: "Delete Item",
    item: item,
  })
})

exports.item_delete_post = asyncHandler(async (req, res, next) => {
  await Item.findByIdAndDelete(req.body.itemid);
  res.redirect("/catalog/items");
})