import dns from "node:dns";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

import "dotenv/config";
import { app } from "./app";
import { env } from "./config/env";
import { connectDB, disconnectDB } from "./db/database";

const PORT = env.PORT;

const startServer = async (): Promise<void> => {
  await connectDB();

  const server = app.listen(PORT, () => {
    console.log(`Server is running on port localhost:${PORT}`);
  });

  const shutdown = async (signal: string): Promise<void> => {
    console.log(`${signal} received. Shutting down...`);

    server.close(async () => {
      console.log("HTTP server closed");

      await disconnectDB();

      process.exit(0);
    });
  };

  process.on("SIGINT", () => shutdown("SIGINT"));
  process.on("SIGTERM", () => shutdown("SIGTERM"));
};

startServer();
