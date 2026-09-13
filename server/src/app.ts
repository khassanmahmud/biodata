import cors from "cors";
import express, { type Express } from "express";
import routes from "./routes";
import { countMessages } from "./messages";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler";
import { requestLogger } from "./middleware/requestLogger";

function parseCorsOrigins(): string[] | boolean {
  const configured = process.env.CORS_ORIGIN ?? "http://localhost:3000";
  const origins = configured
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

  return origins.includes("*") ? true : origins;
}

const ENDPOINTS = {
  health: "GET /health",
  profile: "GET /api/profile",
  skills: "GET /api/skills",
  experience: "GET /api/experience",
  experienceById: "GET /api/experience/:id",
  projects: "GET /api/projects?featured=true|false",
  projectById: "GET /api/projects/:id",
  contact: "POST /api/contact",
};

export function createApp(): Express {
  const app = express();

  app.disable("x-powered-by");
  app.use(requestLogger);
  app.use(cors({ origin: parseCorsOrigins() }));
  app.use(express.json({ limit: "32kb", strict: false }));

  app.get("/", (_req, res) => {
    res.json({
      name: "about-me API server",
      status: "ok",
      endpoints: ENDPOINTS,
    });
  });

  app.get("/health", (_req, res) => {
    res.json({
      status: "ok",
      uptime: process.uptime(),
      messagesReceived: countMessages(),
      timestamp: new Date().toISOString(),
    });
  });

  app.use("/api", routes);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
