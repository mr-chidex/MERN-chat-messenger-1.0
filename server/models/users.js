const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const bcryptJs = require("bcryptjs");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcryptJs.genSalt(12);
  const hashedPass = await bcryptJs.hash(this.password, salt);
  this.password = hashedPass;
  next();
});

module.exports = mongoose.model("User", userSchema);
