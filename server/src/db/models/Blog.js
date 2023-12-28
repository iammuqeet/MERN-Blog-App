const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const BlogSchema = new Schema(
  {
    title: { type: String },
    description: { type: String },
    content: { type: String },
    file: { type: String },
    author: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const BlogModel = model("Blog", BlogSchema);
module.exports = BlogModel;
