import { Request, Response, Router } from "express";
import SignInMidl from "../midll/signIn";
import Create from "../midll/create";

const route = Router();

route.get("/login", SignInMidl, (req: Request | any, res: Response) => {
  return res.status(200).send({ userData: req.user, tokens: req.token });
});
route.post("/create", Create, (req: Request, res: Response) => {
  return res.status(200).send("Usuário criado com sucesso");
});

export default route;