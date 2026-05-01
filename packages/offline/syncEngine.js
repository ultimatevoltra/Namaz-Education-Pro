import { getSyncQueue, markSynced } from './indexedDB';

const MAX_RETRIES = 3;
const SYNC_INTERVAL = 30000;
let syncInProgress = false;

export async function startSyncEngine(userId) {
  window.addEventListener('online', () => {
    console.log('Connection restored, starting sync');
    syncData(userId);
  });

  window.addEventListener('offline', () => {
    console.log('Connection lost, using offline mode');
  });

  setInterval(() => {
    if (navigator.onLine) {
      syncData(userId);
    }
  }, SYNC_INTERVAL);
}

export async function syncData(userId) {
  if (syncInProgress || !navigator.onLine) return;

  syncInProgress = true;

  try {
    const queue = await getSyncQueue(userId);
    const unsynced = queue.filter(item => !item.synced);

    for (const item of unsynced) {
      await syncItem(item, userId);
    }
  } catch (error) {
    console.error('Sync error:', error);
  } finally {
    syncInProgress = false;
  }
}

async function syncItem(item, userId, retries = 0) {
  try {
    const response = await fetch(`/api/sync/${item.table}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId,
        action: item.action,
        data: JSON.parse(item.data)
      })
    });

    if (response.ok) {
      await markSynced(item.id);
      console.log(`Synced ${item.table} successfully`);
    } else if (retries < MAX_RETRIES) {
      setTimeout(() => syncItem(item, userId, retries + 1), 2000);
    }
  } catch (error) {
    if (retries < MAX_RETRIES) {
      setTimeout(() => syncItem(item, userId, retries + 1), 2000 * (retries + 1));
    }
  }
}

export function isSyncInProgress() {
  return syncInProgress;
}
