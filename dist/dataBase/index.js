"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshTokenModel = exports.BlackListModel = exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
mongoose_1.default.connect(process.env.MONGODB);
const userSchema = new mongoose_1.default.Schema({
    email: { type: String, require },
    password: { type: String, require },
    name: { type: String, require },
    photo: { type: String, require: false },
});
const blackListSchema = new mongoose_1.default.Schema({
    token: { type: String, require, expires: 60 * 60 * 24 * 30 },
});
const RefreshTokenSchema = new mongoose_1.default.Schema({
    refresh: { type: String, require },
    userId: { type: String, require },
});
userSchema.pre("save", function (next) {
    var hash = bcryptjs_1.default.hashSync(this.password, 10);
    this.password = hash;
    next();
});
exports.UserModel = mongoose_1.default.model("User", userSchema);
exports.BlackListModel = mongoose_1.default.model("BlackList", blackListSchema);
exports.RefreshTokenModel = mongoose_1.default.model("RefreshToken", RefreshTokenSchema);
