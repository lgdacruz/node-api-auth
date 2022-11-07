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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dataBase_1 = require("../dataBase");
const route = (0, express_1.Router)();
route.post("/refreshToken", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const refresh = req.headers.authorization;
    try {
        const theRefresh = yield dataBase_1.RefreshTokenModel.findOne({ refresh });
        if (!theRefresh)
            return res.status(400).send("Sessão expirada, faça login novamente");
        const userId = theRefresh === null || theRefresh === void 0 ? void 0 : theRefresh.userId;
        jsonwebtoken_1.default.verify(refresh, process.env.JWT_REFRESHTOKEN, (error, decode) => __awaiter(void 0, void 0, void 0, function* () {
            if (error) {
                return res
                    .status(400)
                    .send("Sessão expirada, por favor faça login novamente!");
            }
            if (decode) {
                yield dataBase_1.RefreshTokenModel.findOneAndDelete({ refresh });
                const newToken = jsonwebtoken_1.default.sign({ userId }, process.env.JWT_TOKEN, {
                    expiresIn: 600,
                });
                const newRefresh = jsonwebtoken_1.default.sign({ userId }, process.env.JWT_REFRESHTOKEN, { expiresIn: "7d" });
                yield dataBase_1.RefreshTokenModel.create({ refresh: newRefresh, userId });
                return res
                    .status(200)
                    .send({ tokens: { token: newToken, refresh: newRefresh } });
            }
        }));
    }
    catch (error) {
        return res.status(400).send("Não foi possível renovar a sessão");
    }
}));
exports.default = route;
