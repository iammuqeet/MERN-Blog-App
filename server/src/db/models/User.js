const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const UserSchema = new Schema({
  firstName: { type: String, required: true, min: 3 },
  lastName: { type: String, required: true, min: 3 },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const UserModel = model("User", UserSchema);
module.exports = UserModel;
