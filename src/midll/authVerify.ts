import { NextFunction, Request, Response } from "express";

import jwt from "jsonwebtoken";
import { BlackListModel } from "../dataBase";

const VerifyAuth = async (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;

  try {
    const blacklist = await BlackListModel.findOne({ token });
    if (blacklist) return res.status(400).send("Token inválido");

    jwt.verify(
      token as string,
      process.env.JWT_TOKEN as string,
      (err, decoded: any) => {
        if (err) {
          console.log(err)
          return res.status(401).send("Token inválido");
        }
        req.userId = decoded.userId;
        next();
      }
    );
  } catch (error) {
    return res.status(400).send("Sessão expirada");
  }
};

export default VerifyAuth;
