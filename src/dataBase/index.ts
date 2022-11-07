import mongoose from "mongoose";
import bcrypt from "bcryptjs";

mongoose.connect(process.env.MONGODB as string);

const userSchema = new mongoose.Schema({
  email: { type: String, require },
  password: { type: String, require },
  name: { type: String, require },
  photo: { type: String, require: false },
});

const blackListSchema = new mongoose.Schema({
  token: { type: String, require, expires: 60 * 60 * 24 * 30 },
});
const RefreshTokenSchema = new mongoose.Schema({
  refresh: { type: String, require },
  userId: { type: String, require },
});

userSchema.pre("save", function (next) {
  var hash = bcrypt.hashSync(this.password as string, 10);
  this.password = hash;
  next();
});

export const UserModel = mongoose.model("User", userSchema);
export const BlackListModel = mongoose.model("BlackList", blackListSchema);
export const RefreshTokenModel = mongoose.model(
  "RefreshToken",
  RefreshTokenSchema
);
