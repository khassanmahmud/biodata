import { Router } from "express";
import { HttpError } from "../errors";
import { saveMessage } from "../messages";

const router = Router();

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface FieldRule {
  field: keyof ContactFormInput;
  label: string;
  min: number;
  max: number;
}

interface ContactFormInput {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ValidationFailure {
  field: string;
  message: string;
}

const RULES: FieldRule[] = [
  { field: "name", label: "Name", min: 2, max: 100 },
  { field: "email", label: "Email", min: 5, max: 254 },
  { field: "subject", label: "Subject", min: 3, max: 150 },
  { field: "message", label: "Message", min: 10, max: 5000 },
];

function validate(body: unknown): ContactFormInput {
  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    throw new HttpError(400, "Request body must be a JSON object");
  }

  const payload = body as Record<string, unknown>;
  const errors: ValidationFailure[] = [];
  const values = {} as ContactFormInput;

  for (const { field, label, min, max } of RULES) {
    const raw = payload[field];
    if (typeof raw !== "string" || raw.trim() === "") {
      errors.push({ field, message: `${label} is required` });
      continue;
    }
    const value = raw.trim();
    if (value.length < min || value.length > max) {
      errors.push({
        field,
        message: `${label} must be between ${min} and ${max} characters`,
      });
      continue;
    }
    values[field] = value;
  }

  if (!errors.some((error) => error.field === "email") && !EMAIL_PATTERN.test(values.email)) {
    errors.push({ field: "email", message: "Email must be a valid email address" });
  }

  if (errors.length > 0) {
    throw new HttpError(422, "Validation failed", errors);
  }

  return values;
}

router.post("/", (req, res) => {
  const input = validate(req.body);
  const saved = saveMessage(input);

  res.status(201).json({
    ok: true,
    id: saved.id,
    receivedAt: saved.receivedAt,
  });
});

export default router;
