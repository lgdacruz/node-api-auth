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
const express_1 = require("express");
const dataBase_1 = require("../dataBase");
const authVerify_1 = __importDefault(require("../midll/authVerify"));
const route = (0, express_1.Router)();
route.all("*", authVerify_1.default);
route.get("/getdata", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    try {
        const user = yield dataBase_1.UserModel.findById(userId);
        return res.status(200).send(user);
    }
    catch (_a) {
        return res.status(400).send("Não foi possível retornar dados do usuário");
    }
}));
route.post("/signOut", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization;
    try {
        yield dataBase_1.BlackListModel.create({ token });
        return res.status(200).send("LogOut bem sucedido");
    }
    catch (_b) {
        return res.status(400).send("Não foi possível fazer LogOut");
    }
}));
exports.default = route;
