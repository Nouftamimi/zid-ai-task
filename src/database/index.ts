// database/index.ts
import Realm from "realm";
import { ChatMessageSchema } from "./schemas/ChatMessageSchema";
import { migration } from "./migrations";

export const realm = new Realm({
  schema: [ChatMessageSchema],
  schemaVersion: 3,
  onMigration: migration,
});
