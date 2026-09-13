import "dotenv/config";
import { createApp } from "./app.js";

const port = Number.parseInt(process.env.PORT ?? "4000", 10);

if (!Number.isInteger(port) || port <= 0 || port > 65535) {
  console.error(`Invalid PORT value: ${process.env.PORT}`);
  process.exit(1);
}

const server = createApp().listen(port, "0.0.0.0", () => {
  console.log(`API server listening on http://0.0.0.0:${port}`);
});

function shutdown(signal: string): void {
  console.log(`\n${signal} received — shutting down gracefully`);
  server.close(() => process.exit(0));
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));