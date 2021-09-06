// let db;


// https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB
// https://www.w3.org/TR/IndexedDB/
// https://www.youtube.com/watch?v=n4E4kjQIw6M


var request = window.indexedDB.open("industrialGrind");
let db;

// handlers



request.onerror = function(event) {
    console.log("dank");
};

request.onsuccess = function(event) {
    console.log("ohno!");
};

  


export function useIndexedDb(databaseName, storeName, method, object) {
    return new Promise((resolve, reject) => {
    //   const request = window.indexedDB.open(databaseName, 1);
      let db,
        tx,
        store;
  
      request.onupgradeneeded = function(e) {
        const db = request.result;
        db.createObjectStore(storeName, { keyPath: "_id" });
      };
  
      request.onerror = function(e) {
        console.log("There was an error");
      };
  
      request.onsuccess = function(e) {
        db = request.result;
        tx = db.transaction(storeName, "readwrite");
        store = tx.objectStore(storeName);
  
        db.onerror = function(e) {
          console.log("error");
        };
        if (method === "put") {
          store.put(object);
        }
        if (method === "get") {
          const all = store.getAll();
          all.onsuccess = function() {
            resolve(all.result);
          };
        }
        tx.oncomplete = function() {
          db.close();
        };
      };
    });
  }