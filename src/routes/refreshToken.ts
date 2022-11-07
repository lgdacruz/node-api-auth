import { Router, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { BlackListModel, RefreshTokenModel } from "../dataBase";

const route = Router();
route.post("/refreshToken", async (req: Request, res: Response) => {
  const refresh = req.headers.authorization;

  try {
    const theRefresh = await RefreshTokenModel.findOne({ refresh });
    if (!theRefresh)
      return res.status(400).send("Sessão expirada, faça login novamente");
    const userId = theRefresh?.userId;

    jwt.verify(
      refresh as string,
      process.env.JWT_REFRESHTOKEN as string,
      async (error, decode) => {
        if (error) {
          return res
            .status(400)
            .send("Sessão expirada, por favor faça login novamente!");
        }

        if (decode) {
          await RefreshTokenModel.findOneAndDelete({ refresh });

          const newToken = jwt.sign(
            { userId },
            process.env.JWT_TOKEN as string,
            {
              expiresIn: 600,
            }
          );
          const newRefresh = jwt.sign(
            { userId },
            process.env.JWT_REFRESHTOKEN as string,
            { expiresIn: "7d" }
          );

          await RefreshTokenModel.create({ refresh: newRefresh, userId });

          return res
            .status(200)
            .send({ tokens: { token: newToken, refresh: newRefresh } });
        }
      }
    );
  } catch (error) {
    return res.status(400).send("Não foi possível renovar a sessão");
  }
});

export default route;
