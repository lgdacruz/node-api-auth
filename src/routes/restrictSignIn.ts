import { Request, Response, Router } from "express";

import { BlackListModel, UserModel } from "../dataBase";
import VerifyAuth from "../midll/authVerify";

const route = Router();

route.all("*", VerifyAuth);

route.get("/getdata", async (req: Request | any, res: Response) => {
  const userId = req.userId;
  try {
    const user = await UserModel.findById(userId);
    return res.status(200).send(user);
  } catch {
    return res.status(400).send("Não foi possível retornar dados do usuário");
  }
});

route.post("/signOut", async (req: Request | any, res: Response) => {
  const token = req.headers.authorization;
  try {
    await BlackListModel.create({ token });
    return res.status(200).send("LogOut bem sucedido");
  } catch {
    return res.status(400).send("Não foi possível fazer LogOut");
  }
});

export default route;
