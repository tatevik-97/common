import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserPayload } from "../types/types";

export const currentUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer ")
  ) {
    return next();
  }

  try {
    const token = req.headers.authorization.split(" ")[1];
    const payload = jwt.verify(token, process.env.JWT_KEY as string);

    if (!payload) {
      return next();
    }

    req.currentUser = payload as UserPayload;
  } catch (err) {
    throw err;
  }

  next();
};
