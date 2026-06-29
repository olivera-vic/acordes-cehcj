import { openDB } from "idb";

const DB_NAME = "acordes-cehcj";
const DB_VERSION = 2;

export const dbPromise = openDB(DB_NAME, DB_VERSION, {
  upgrade(db) {

    // =========================
    // CANCIONES
    // =========================
    if (!db.objectStoreNames.contains("songs")) {
      db.createObjectStore("songs", {
        keyPath: "id",
      });
    }

    // =========================
    // CONFIG
    // =========================
    if (!db.objectStoreNames.contains("config")) {
      db.createObjectStore("config", {
        keyPath: "id",
      });
    }

    // =========================
    // FAVORITOS
    // =========================
    if (!db.objectStoreNames.contains("favorites")) {
      db.createObjectStore("favorites", {
        keyPath: "id",
      });
    }
  },
});


// ======================================================
// CANCIONES
// ======================================================

export async function getSongs() {
  const db = await dbPromise;
  return await db.getAll("songs");
}

export async function getSong(id) {
  const db = await dbPromise;
  return await db.get("songs", Number(id));
}

export async function saveSong(song) {
  const db = await dbPromise;
  await db.put("songs", song);
}

export async function saveSongs(songs) {
  const db = await dbPromise;

  const tx = db.transaction("songs", "readwrite");

  for (const song of songs) {
    tx.store.put(song);
  }

  await tx.done;
}

export async function clearSongs() {
  const db = await dbPromise;
  await db.clear("songs");
}


// ======================================================
// CONFIG
// ======================================================

export async function getConfig() {
  const db = await dbPromise;
  return await db.get("config", 1);
}

export async function saveConfig(config) {
  const db = await dbPromise;

  await db.put("config", {
    id: 1,
    ...config,
  });
}


// ======================================================
// FAVORITOS
// ======================================================

// Obtener todos
export async function getFavorites() {
  const db = await dbPromise;
  return await db.getAll("favorites");
}

// Saber si una canción es favorita
export async function isFavorite(id) {
  const db = await dbPromise;

  const favorito = await db.get("favorites", Number(id));

  return !!favorito;
}

// Agregar favorito
export async function addFavorite(id) {
  const db = await dbPromise;

  await db.put("favorites", {
    id: Number(id),
    fecha: Date.now(),
  });
}

// Eliminar favorito
export async function removeFavorite(id) {
  const db = await dbPromise;

  await db.delete("favorites", Number(id));
}