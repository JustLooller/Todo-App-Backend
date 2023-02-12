import { Request, Response } from "express";
import { register, login } from "../model/Model";
import * as jwt from "jsonwebtoken";

export class UserController {
  public async signUp(req: Request, res: Response) {
    const result = await register(req.body.username, req.body.password);
    if (result === -1)
      return res
        .status(409)
        .send({ status: "error", message: "User already registered" });

    return res
      .status(200)
      .send({ status: "success", message: "User successfully registered" });
  }

  public async signIn(req: Request, res: Response) {
    const result = await login(req.body.username, req.body.password);
    if (result === -1) {
      return res
        .status(401)
        .send({ status: "error", message: "User not found" });
    } else {
      const token = jwt.sign(
        { username: req.body.username },
        process.env.JWT_SECRET_KEY as string
      );
      return res
        .status(200)
        .send({ status: "success", message: "login successful", token: token });
    }
  }
}
