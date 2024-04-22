import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserPayload } from "../types/types";
import {NotAuthorizedError} from "../../build";

export const currentUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer ")
  ) {
throw new NotAuthorizedError()  }

  try {
    const token = req.headers.authorization.split(" ")[1];
    const payload = jwt.verify(token, process.env.JWT_KEY as string);

    if (!payload) {
      throw new NotAuthorizedError()
  }

    req.currentUser = payload as UserPayload;
  } catch (err) {
    throw err;
  }

  next();
};
