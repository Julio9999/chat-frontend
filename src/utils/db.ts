import type { ChatMessage } from "@/interfaces/chat/chat-interfaces";
import { openDB } from "idb";

const DB_NAME = "chat-db";
const STORE_NAME = "messages";

const getDB = async () => {
  return await openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, {
          keyPath: "id",
          autoIncrement: true,
        });
      }
    },
  });
};

const saveMessage = async (message: ChatMessage) => {
  const db = await getDB();
  await db.add(STORE_NAME, {
    timestamp: Date.now(),
    ...message,
  });
};

const getAllMessages = async () => {
  const db = await getDB();
  return await db.getAll(STORE_NAME);
};

const getPaginatedMessages = async (
  page: number,
  pageSize: number
): Promise<{ messages: ChatMessage[]; isLastPage: boolean }> => {
  const db = await getDB();
  const tx = db.transaction(STORE_NAME, 'readonly');
  const store = tx.objectStore(STORE_NAME);

  const messages: ChatMessage[] = [];
  const start = page * pageSize;
  let skipped = 0;

  let cursor = await store.openCursor();

  while (cursor) {
    if (skipped < start) {
      skipped++;
      cursor = await cursor.continue();
      continue;
    }

    if (messages.length < pageSize) {
      messages.push(cursor.value);
      cursor = await cursor.continue();
    } else {
      return { messages, isLastPage: false };
    }
  }

  return { messages, isLastPage: true };
};

export const IndexedDBClient = {
  saveMessage,
  getAllMessages,
  getPaginatedMessages,
}