import { openDB } from 'idb';

let db = null;

export async function initDB() {
  if (db) return db;

  db = await openDB('NamazEducationPro', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('salahProgress')) {
        const store = db.createObjectStore('salahProgress', { keyPath: 'id' });
        store.createIndex('userId', 'userId');
        store.createIndex('completedAt', 'completedAt');
      }

      if (!db.objectStoreNames.contains('salahMistakes')) {
        const store = db.createObjectStore('salahMistakes', { keyPath: 'id' });
        store.createIndex('userId', 'userId');
        store.createIndex('salahProgressId', 'salahProgressId');
      }

      if (!db.objectStoreNames.contains('syncQueue')) {
        const store = db.createObjectStore('syncQueue', { keyPath: 'id' });
        store.createIndex('synced', 'synced');
        store.createIndex('userId', 'userId');
      }

      if (!db.objectStoreNames.contains('userCache')) {
        db.createObjectStore('userCache', { keyPath: 'userId' });
      }
    }
  });

  return db;
}

export async function saveSalahProgress(userId, data) {
  const db = await initDB();
  const id = `${userId}_${Date.now()}`;
  
  const record = {
    id,
    userId,
    ...data,
    completedAt: new Date().toISOString(),
    synced: false
  };

  await db.put('salahProgress', record);
  
  await db.put('syncQueue', {
    id: `sync_${id}`,
    userId,
    action: 'create',
    table: 'salahProgress',
    data: JSON.stringify(record),
    synced: false,
    createdAt: new Date().toISOString()
  });

  return record;
}

export async function getSalahProgress(userId, date) {
  const db = await initDB();
  const index = db.transaction('salahProgress').store.index('userId');
  const records = await index.getAll(userId);
  
  if (date) {
    const dateStart = new Date(date);
    dateStart.setHours(0, 0, 0, 0);
    const dateEnd = new Date(date);
    dateEnd.setHours(23, 59, 59, 999);
    
    return records.filter(r => {
      const completedDate = new Date(r.completedAt);
      return completedDate >= dateStart && completedDate <= dateEnd;
    });
  }
  
  return records;
}

export async function getSyncQueue(userId) {
  const db = await initDB();
  const index = db.transaction('syncQueue').store.index('userId');
  return await index.getAll(userId);
}

export async function markSynced(id) {
  const db = await initDB();
  const record = await db.get('syncQueue', id);
  if (record) {
    record.synced = true;
    record.syncedAt = new Date().toISOString();
    await db.put('syncQueue', record);
  }
}
