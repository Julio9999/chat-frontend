// src/lib/db.ts
import { openDB } from 'idb';

const DB_NAME = 'chat-db';
const STORE_NAME = 'messages';

export const getDB = async () => {
  return await openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
      }
    }
  });
};

export const saveMessage = async (message: any) => {
  const db = await getDB();
  await db.add(STORE_NAME, {
    timestamp: Date.now(),
    ...message,
  });
};

export const getAllMessages = async () => {
  const db = await getDB();
  return await db.getAll(STORE_NAME);
};
