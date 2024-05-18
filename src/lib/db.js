let db;

const DB_NAME = "db";
const DB_VERSION = 1;

export function openDatabase() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = function (event) {
            const db = event.target.result;
            if (!db.objectStoreNames.contains("scans")) {
                // Create a new object store
                const dailyGoalsStore = db.createObjectStore("scans", { keyPath: "id", autoIncrement: true });

                dailyGoalsStore.createIndex("date", "date", { unique: false });
                dailyGoalsStore.createIndex("content", "content", { unique: false });
            }

            // Have to update DB version to create a new objectStore. Or else we will get error "DOMException IDBDatabase.transaction: 'objectStore' is not a known object store name"
        };

        request.onsuccess = function (event) {
            db = event.target.result;
            resolve(db);
        };

        request.onerror = function (event) {
            reject(event.target.error);
        };
    });
}

export function getDatabase() {
    if (db) {
        return Promise.resolve(db);
    } else {
        return openDatabase();
    }
}

export async function getAllScans() {
    try {
        const db = await getDatabase();
        const transaction = db.transaction(["scans"], "readonly");
        const store = transaction.objectStore("scans");
        const index = store.index("date");

        const scans = [];
        const request = index.openCursor(null, "prev"); // 'prev' for descending order

        return new Promise((resolve, reject) => {
            request.onsuccess = function (event) {
                const cursor = event.target.result;
                if (cursor) {
                    scans.push(cursor.value);
                    cursor.continue();
                } else {
                    resolve(scans);
                }
            };

            request.onerror = function (event) {
                reject(event.target.error);
            };
        });
    } catch (error) {
        console.error("Failed to retrieve scans:", error);
        throw error;
    }
}

export async function addScan(scan) {
    try {
        const db = await getDatabase();
        const transaction = db.transaction(["scans"], "readwrite");
        const store = transaction.objectStore("scans");

        const request = store.add(scan);

        return new Promise((resolve, reject) => {
            request.onsuccess = function () {
                resolve();
            };

            request.onerror = function (event) {
                reject(event.target.error);
            };
        });
    } catch (error) {
        console.error("Failed to add scan:", error);
        throw error;
    }
}

export default { getAllScans, addScan };
