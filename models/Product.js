const { Schema, model } = require("mongoose");

const ProductSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
});

export const Product = model("Product", ProductSchema);
