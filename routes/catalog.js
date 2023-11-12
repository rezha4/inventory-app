const express = require("express");
const router = express.Router();

const category_controller = require("../controllers/categoryController");
const item_controller = require("../controllers/itemController");

router.get("/", item_controller.index);

router.get("/items", item_controller.item_list);

router.get("/items/:id", item_controller.item_detail);

// GET /items/create
// GET /items/create
// GET /items/:id/delete
// POST /items/:id/delete
// /items/update