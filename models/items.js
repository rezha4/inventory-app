const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: { type: String, required: true, minLength: 3, maxLength: 50 },
  description: { type: String, required: true, minLength: 3, maxLength: 100 },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  price: { type: Number, required: true, min: 0 },
  stock: { type: Number, required: true, min: 0 },
});

ItemSchema.virtual("url").get(() => {
  return `/items/${this._id}`;
});

module.exports = mongoose.model("Item", ItemSchema);