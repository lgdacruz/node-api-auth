import { Request, Response, NextFunction } from "express";
import { RefreshTokenModel, UserModel } from "../dataBase";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const SignInMidl = async (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).send("Insira todos os campos!");

  try {
    const user = await UserModel.findOne({ email });

    if (!user) return res.status(404).send("Usuário não encontrado");

    if (!bcrypt.compareSync(password, user?.password as string)) {
      return res.status(400).send("Senha incorreta");
    }

    await RefreshTokenModel.findOneAndDelete({ userId: user._id });

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_TOKEN as string,
      { expiresIn: 600 }
    );
    const refresh = jwt.sign(
      { userId: user._id },
      process.env.JWT_REFRESHTOKEN as string,
      { expiresIn: "7d" }
    );

    await RefreshTokenModel.create({ refresh: refresh, userId: user._id });

    req.user = user;
    req.token = {
      token,
      refresh,
    };
    next();
  } catch (e) {
    return res.status(400).send("Usuário não encontrado");
  }
};

export default SignInMidl;
