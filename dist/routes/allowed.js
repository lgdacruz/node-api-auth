"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const signIn_1 = __importDefault(require("../midll/signIn"));
const create_1 = __importDefault(require("../midll/create"));
const route = (0, express_1.Router)();
route.get("/login", signIn_1.default, (req, res) => {
    return res.status(200).send({ userData: req.user, tokens: req.token });
});
route.post("/create", create_1.default, (req, res) => {
    return res.status(200).send("Usuário criado com sucesso");
});
exports.default = route;
