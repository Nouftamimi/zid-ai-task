// database/migrations.ts
// migrations.ts
import Realm from "realm";

export const migration: Realm.MigrationCallback = (
  oldRealm,
  newRealm
) => {

  const oldVersion = oldRealm.schemaVersion;

  // ---- ChatMessage changes (v2) ----
  if (oldVersion < 2) {
    const chats = newRealm.objects("ChatMessage");
    for (let i = 0; i < chats.length; i++) {
      chats[i].updatedAt = new Date();
    }
  }
};
