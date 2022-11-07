import { NextFunction, Request, Response } from "express";
import { UserModel } from "../dataBase";

const Create = async (req: Request, res: Response, next: NextFunction) => {
  const { email, name, password } = req.body;
  if (!email || !name || !password)
    return res.status(400).send("É necessário todos os dados");
  try {
    const user = await UserModel.findOne({ email });
    if (user) return res.status(400).send("Conta já existe");

    await UserModel.create({ email, name, password });

    next();
  } catch (error) {
    return res.status(400).send("Erro ao buscar usuário no banco de dados");
  }
};

export default Create;
