const express = require("express");
const router = express.Router();

const category_controller = require("../controllers/categoryController");
const item_controller = require("../controllers/itemController");

router.get("/", item_controller.index);

router.get("/items", item_controller.item_list);

// GET /items/create form
router.get("/items/create", item_controller.item_create_get);

router.post("/items/create", item_controller.item_create_post)

// POST /items/create update db
// GET /items/:id/delete ?
// POST /items/:id/delete update db
// GET /items/:id/update
// POST /items/:id/update

router.get("/items/:id", item_controller.item_detail);

router.get("/categories", category_controller.category_list);

router.get("/category/:id", category_controller.category_detail);

module.exports = router;
