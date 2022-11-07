"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dataBase_1 = require("../dataBase");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SignInMidl = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password)
        return res.status(400).send("Insira todos os campos!");
    try {
        const user = yield dataBase_1.UserModel.findOne({ email });
        if (!user)
            return res.status(404).send("Usuário não encontrado");
        if (!bcryptjs_1.default.compareSync(password, user === null || user === void 0 ? void 0 : user.password)) {
            return res.status(400).send("Senha incorreta");
        }
        yield dataBase_1.RefreshTokenModel.findOneAndDelete({ userId: user._id });
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.JWT_TOKEN, { expiresIn: 600 });
        const refresh = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.JWT_REFRESHTOKEN, { expiresIn: "7d" });
        yield dataBase_1.RefreshTokenModel.create({ refresh: refresh, userId: user._id });
        req.user = user;
        req.token = {
            token,
            refresh,
        };
        next();
    }
    catch (e) {
        return res.status(400).send("Usuário não encontrado");
    }
});
exports.default = SignInMidl;
