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
Object.defineProperty(exports, "__esModule", { value: true });
const dataBase_1 = require("../dataBase");
const Create = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, name, password } = req.body;
    if (!email || !name || !password)
        return res.status(400).send("É necessário todos os dados");
    try {
        const user = yield dataBase_1.UserModel.findOne({ email });
        if (user)
            return res.status(400).send("Conta já existe");
        yield dataBase_1.UserModel.create({ email, name, password });
        next();
    }
    catch (error) {
        return res.status(400).send("Erro ao buscar usuário no banco de dados");
    }
});
exports.default = Create;
