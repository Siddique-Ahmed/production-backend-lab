import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError.";

export const errorMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (error instanceof AppError) {
    res.status(error.statusCode).json({
      success: false,
      message: error.message,
    });

    return;
  }

  console.error("Unexpected error:", error);

  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
};