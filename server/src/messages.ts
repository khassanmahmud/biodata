import { randomUUID } from "node:crypto";
import type { ContactMessage } from "./types";

const messages: ContactMessage[] = [];

export function saveMessage(
  input: Omit<ContactMessage, "id" | "receivedAt">,
): ContactMessage {
  const message: ContactMessage = {
    ...input,
    id: randomUUID(),
    receivedAt: new Date().toISOString(),
  };
  messages.push(message);
  return message;
}

export function countMessages(): number {
  return messages.length;
}
