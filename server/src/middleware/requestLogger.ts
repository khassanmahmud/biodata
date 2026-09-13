import type { NextFunction, Request, Response } from "express";

export function requestLogger(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const startedAt = process.hrtime.bigint();

  res.on("finish", () => {
    const durationMs = Number(process.hrtime.bigint() - startedAt) / 1e6;
    console.log(
      `${new Date().toISOString()}  ${req.method.padEnd(6)} ${res.statusCode}  ${req.originalUrl}  ${durationMs.toFixed(1)}ms`,
    );
  });

  next();
}
