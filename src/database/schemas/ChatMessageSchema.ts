// database/schemas/ChatMessageSchema.ts
import Realm from "realm";

export class ChatMessageSchema extends Realm.Object<ChatMessageSchema> {
  _id!: string;
  role!: string;
  content!: string;
  version!: number;
  updatedAt!: Date;
  isSynced!: boolean;

  static schema = {
    name: "ChatMessage",
    primaryKey: "_id",
    properties: {
      _id: "string",
      role: "string",
      content: "string",
      updatedAt: "date",
    },
  };
}
