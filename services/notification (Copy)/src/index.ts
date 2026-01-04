import { createServer } from "http";
import { connectRmq } from "./infrastructure/rabbitmq/rabbitmq.provider.js";
import express from "express";

async function start() {
  try {
    // await connectRmq();

    const app = express();
    app.use(express.json());
    app.all("/", (req, res) => {
      res.json(req.body);
    });

    const server = createServer(app);

    const port = 3020;
    const host = "127.0.0.1";

    server.listen(port, host, () => {
      console.log(`Notification server running on http://${host}:${port}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

start();
