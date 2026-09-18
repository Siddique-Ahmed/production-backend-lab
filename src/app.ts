import express from "express";
import { errorMiddleware } from "./middleware/error.middleware";
import { AppError } from "./errors/AppError.";
import { notFoundMiddleware } from "./middleware/not-found.middleware";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Ecommerce Api is Running with TypeScript!",
  });
});

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
  });
});

// Docker cache test

app.get("/test-error", (req, res) => {
  throw new AppError("This is a test error", 400);
});

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export { app };
