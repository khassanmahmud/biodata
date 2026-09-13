import "dotenv/config";
import { createApp } from "./app";

const port = Number.parseInt(process.env.PORT ?? "4000", 10);

if (!Number.isInteger(port) || port <= 0 || port > 65535) {
  console.error(`Invalid PORT value: ${process.env.PORT}`);
  process.exit(1);
}

const server = createApp().listen(port, () => {
  console.log(`API server listening on http://localhost:${port}`);
});

function shutdown(signal: string): void {
  console.log(`\n${signal} received — shutting down gracefully`);
  server.close(() => process.exit(0));
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
