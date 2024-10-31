import { Request, Response, NextFunction } from "express";

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  console.error("errorHandler ", err);
  res.status(500).json({ 
    message: "Internal Server Error", 
    stack: err?.stack, 
    error: err?.message, 
    name: err?.name
  });
}