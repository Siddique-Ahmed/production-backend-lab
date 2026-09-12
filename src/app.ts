import express from "express";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Ecommerce Api is Running!",
  });
});

export { app };
