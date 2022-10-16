import { PAGE_SIZE } from '@/config';
import { Playlist, Tab } from '@/types';

const DB_NAME = 'playlists-galore';

const DB_VERSION = 1;

const METADATA_STORE = 'metadata';

const REGULAR_PLAYLISTS_STORE = 'regular-playlists';

const SPECIAL_PLAYLISTS_STORE = 'special-playlists';

const LAST_UPDATE_INDEX = 'last-update';

const LAST_UPDATE_INDEX_PATH = 'lastUpdate';

let dbConnection: IDBDatabase;

export function openIndexDB() {
  return new Promise((resolve, reject) => {
    if (!('indexedDB' in window)) {
      console.error("This browser doesn't support IndexedDB");
      reject(new Error('IndexedDB not supported'));
    }

    console.log('DB version: ', DB_VERSION);
    console.log('Open DB');

    // Request to open the DB
    const openDBRequest = indexedDB.open(DB_NAME, DB_VERSION);

    // Triggered if the db version doesn't exist (0) or is less than VERSION
    openDBRequest.onupgradeneeded = () => {
      // Save database connection
      const db = openDBRequest.result;
      console.log('DB upgrade needed');

      // Create object stores
      if (!db.objectStoreNames.contains(METADATA_STORE)) {
        db.createObjectStore(METADATA_STORE);
      }
      if (!db.objectStoreNames.contains(REGULAR_PLAYLISTS_STORE)) {
        const store = db.createObjectStore(REGULAR_PLAYLISTS_STORE, {
          keyPath: 'name',
          autoIncrement: true,
        });
        store.createIndex(LAST_UPDATE_INDEX, LAST_UPDATE_INDEX_PATH, {
          unique: false,
        });
      }
      if (!db.objectStoreNames.contains(SPECIAL_PLAYLISTS_STORE)) {
        const store = db.createObjectStore(SPECIAL_PLAYLISTS_STORE, {
          keyPath: 'name',
          autoIncrement: true,
        });
        store.createIndex(LAST_UPDATE_INDEX, LAST_UPDATE_INDEX_PATH, {
          unique: false,
        });
      }

      console.log('DB upgrade done');
    };

    openDBRequest.onerror = () => {
      console.error('Open DB failed');
      reject(openDBRequest.error);
    };

    openDBRequest.onsuccess = () => {
      dbConnection = openDBRequest.result;
      console.log('Open DB success');
      resolve(dbConnection);
    };
  });
}

export async function populateDB(
  timestamp: number,
  standardPlaylists: Playlist[],
  specialPlaylists: Playlist[]
) {
  console.log('Populate DB, new timestamp =', timestamp);
  const currentTs = await readMetadata('timestamp');
  if (timestamp !== currentTs) {
    console.log('Data update needed');
    putMetadata('timestamp', timestamp);
    await populateStore(REGULAR_PLAYLISTS_STORE, standardPlaylists);
    await populateStore(SPECIAL_PLAYLISTS_STORE, specialPlaylists);
    console.log('Data update done');
  } else {
    console.log('Data already up to date');
  }
  return true;
}

async function populateStore(
  storeName: string,
  data: Record<string, unknown>[]
) {
  return new Promise((resolve, reject) => {
    console.log('Populate store', storeName);

    // ouverture d'une transaction sur le store
    const transaction = dbConnection.transaction([storeName], 'readwrite');

    transaction.oncomplete = () => {
      console.log(`Populate store ${storeName} complete`);
      resolve(true);
    };

    transaction.onerror = () => {
      console.log(`Populate store ${storeName} failed`);
      reject(new Error(`${transaction.error}`));
    };

    // recupération du store depuis la transaction
    const store = transaction.objectStore(storeName);

    data.forEach((item) => {
      store.put(item);
    });

    transaction.commit();
  });
}

async function putMetadata(key: string, value: number | string) {
  return new Promise((resolve, reject) => {
    console.log('Add metadata', { key, value });

    // ouverture d'une transaction sur le store
    const transaction = dbConnection.transaction([METADATA_STORE], 'readwrite');

    transaction.oncomplete = () => {
      console.log('Add metadata complete');
      resolve(true);
    };

    transaction.onerror = () => {
      console.log('Add metadata failed');
      reject(new Error(`${transaction.error}`));
    };

    // recupération du store depuis la transaction
    const store = transaction.objectStore(METADATA_STORE);

    store.put(value, key);

    transaction.commit();
  });
}

async function readMetadata(key: string): Promise<number | string | boolean> {
  return new Promise((resolve, reject) => {
    // ouverture d'une transaction sur le store
    const transaction = dbConnection.transaction([METADATA_STORE], 'readwrite');
    // recupération du store depuis la transaction
    const store = transaction.objectStore(METADATA_STORE);

    const req = store.get(key);

    req.onsuccess = (e) => {
      const metadata = (e.target as IDBRequest)?.result;
      console.log(`Read DB metadata: ${key} =`, metadata);
      resolve(metadata);
    };

    req.onerror = (e) => {
      console.log(`Read DB metadata ${key} failed:`, e);
      reject(e);
    };
  });
}

export async function readPage(page: number, tab: Tab) {
  // console.log('[DEBUG] Read page:', { page, tab });
  if (tab === 'regular') {
    return readPageFromStore(page, REGULAR_PLAYLISTS_STORE, LAST_UPDATE_INDEX);
  }
  if (tab === 'special') {
    return readPageFromStore(page, SPECIAL_PLAYLISTS_STORE, LAST_UPDATE_INDEX);
  }
  return [];
}

async function readPageFromStore(
  page: number,
  storeName: string,
  indexName: string
): Promise<Playlist[]> {
  return new Promise((resolve, reject) => {
    // ouverture d'une transaction sur le store
    const transaction = dbConnection.transaction([storeName], 'readwrite');
    // recupération du store depuis la transaction
    const store = transaction.objectStore(storeName);

    const data: Playlist[] = [];
    let hasSkipped = false;

    // Open cursor
    const request = store.index(indexName).openCursor(null, 'prev');
    request.onsuccess = (e) => {
      const cursor = (e.target as IDBRequest)?.result;

      // move cursor if necessary, i.e. if we don't start on the first page
      if (!hasSkipped && page !== 1) {
        hasSkipped = true;
        cursor.advance((page - 1) * PAGE_SIZE);
        return;
      }

      if (cursor) {
        // Read values for the current page
        data.push(cursor.value);
        if (data.length < PAGE_SIZE) {
          cursor.continue();
        } else {
          resolve(data);
        }
      } else {
        // console.log('[DEBUG] Entries all displayed.');
        resolve(data);
      }
    };

    request.onerror = (e) => {
      console.log('Open cursor failed', e);
      reject(new Error(`${request.error}`));
    };
  });
}
