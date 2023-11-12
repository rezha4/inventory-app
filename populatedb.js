#! /usr/bin/env node

console.log(
  'This script populates some test data to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Category = require("./models/categories");
const Item = require("./models/items");

const categories = [];
const items = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false); // Prepare for Mongoose 7

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createCategories();
  await createItems();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

// We pass the index to the ...Create functions so that, for example,
// genre[0] will always be the Fantasy genre, regardless of the order
// in which the elements of promise.all's argument complete.
async function categoryCreate(index, name, description) {
    const category = new Category({
        name: name,
        description: description,
    })
    await category.save();
    categories[index] = category;
    console.log(`Added category: ${{name, description}}`);
}

async function itemCreate(index, name, description, category, price, stock) {
  const item = new Item({
    name: name,
    description: description,
    category: category,
    price: price,
    stock: stock,
  });
  await item.save();
  items[index] = item;
  console.log(`Added item: ${{name, description, category, price, stock}}`);
}

async function createCategories() {
    console.log("Adding Categories");
    await Promise.all([
        categoryCreate(0, "Weapon", "Weapons, to inflict attack"),
        categoryCreate(1, "Armor", "Armor, to defend one-self"),
    ])
}

async function createItems() {
  console.log("Adding Items");
  await Promise.all([
    itemCreate(0, "Wooden Sword", "Sword made of a sturdy wood", categories[0], 8, 3),
    itemCreate(1, "Iron Sword", "Hard sword made of iron", categories[0], 45, 2),
    itemCreate(2, "Gold Sword", "Shiny gold sword", categories[0], 235, 1),
    itemCreate(3, "Wooden Bow", "Long bow", categories[0], 18, 4),
    itemCreate(4, "Chainmail", "Vest-like armor made of steel chains", categories[1], 28, 1),
  ]);
}
