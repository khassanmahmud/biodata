import type { NextFunction, Request, Response } from "express";
import { HttpError } from "../errors";

interface StatusCarryingError {
  status?: unknown;
  statusCode?: unknown;
  type?: unknown;
  message?: unknown;
}

export function notFoundHandler(req: Request, res: Response): void {
  res.status(404).json({
    error: {
      status: 404,
      message: `Route not found: ${req.method} ${req.originalUrl}`,
    },
  });
}

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  if (err instanceof HttpError) {
    res.status(err.status).json({
      error: { status: err.status, message: err.message, details: err.details },
    });
    return;
  }

  const httpish = err as StatusCarryingError;
  const status = httpish.status ?? httpish.statusCode;
  if (typeof status === "number" && status >= 400 && status < 500) {
    const isBadJson = httpish.type === "entity.parse.failed";
    res.status(status).json({
      error: {
        status,
        message: isBadJson
          ? "Request body is not valid JSON"
          : String(httpish.message ?? "Bad request"),
      },
    });
    return;
  }

  console.error("Unhandled error:", err);
  res.status(500).json({
    error: { status: 500, message: "Internal server error" },
  });
}
