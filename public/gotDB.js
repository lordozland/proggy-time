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

  
const request = indexedDB.open("library");
let db;

request.onupgradeneeded = function() {
  // The database did not previously exist, so create object stores and indexes.
  const db = request.result;
  const store = db.createObjectStore("books", {keyPath: "isbn"});
  const titleIndex = store.createIndex("by_title", "title", {unique: true});
  const authorIndex = store.createIndex("by_author", "author");

  // Populate with initial data.
  store.put({title: "Quarry Memories", author: "Fred", isbn: 123456});
  store.put({title: "Water Buffaloes", author: "Fred", isbn: 234567});
  store.put({title: "Bedrock Nights", author: "Barney", isbn: 345678});

  console.log("here")
};

request.onsuccess = function() {
  db = request.result;
};

request.onsuccess = function() {
    db = request.result;
};

// export function useIndexedDb(databaseName, storeName, method, object) {
//     return new Promise((resolve, reject) => {
//     //   const request = window.indexedDB.open(databaseName, 1);
//       let db,
//         tx,
//         store;
  
//       request.onupgradeneeded = function(e) {
//         const db = request.result;
//         db.createObjectStore(storeName, { keyPath: "_id" });
//       };
  
//       request.onerror = function(e) {
//         console.log("There was an error");
//       };
  
//       request.onsuccess = function(e) {
//         db = request.result;
//         tx = db.transaction(storeName, "readwrite");
//         store = tx.objectStore(storeName);
  
//         db.onerror = function(e) {
//           console.log("error");
//         };
//         if (method === "put") {
//           store.put(object);
//         }
//         if (method === "get") {
//           const all = store.getAll();
//           all.onsuccess = function() {
//             resolve(all.result);
//           };
//         }
//         tx.oncomplete = function() {
//           db.close();
//         };
//       };
//     });
//   }