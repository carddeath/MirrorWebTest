import { Request, Response, NextFunction } from "express";

export const corsEnable = (req: Request, res: Response, next: NextFunction) => {
  res.header(`Access-Control-Allow-Origin`, `*`);
  res.header(`Access-Control-Allow-Methods`, `GET,PUT,POST,DELETE,PATCH`);
  res.header(`Access-Control-Allow-Headers`, `Content-Type`);
  next();
};
