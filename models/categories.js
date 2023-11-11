const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: { type: String, required: true, minLength: 3, maxLength: 50 },
  description: { type: String, required: true, minLength: 3, maxLength: 100 },
});

ItemSchema.virtual("url").get(() => {
  return `/cateogry/${this._id}`;
});

module.exports = mongoose.model("Category", CategorySchema);
