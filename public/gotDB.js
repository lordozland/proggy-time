// let db;


// https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB
// https://www.w3.org/TR/IndexedDB/
// https://www.youtube.com/watch?v=n4E4kjQIw6M
// https://stackoverflow.com/questions/19609173/indexeddb-reference-error-db-is-not-defined

// var windowVar = (/*...*/);

// if (indexedDB) {
//     console.log("IndexedDB is supported");
// }
// else {
//     alert("Indexed DB is not supported!");
// };

var db;
var request = indexedDB.open("MyTestDatabase");
request.onerror = function(event) {
  console.log("Why didn't you allow my web app to use IndexedDB?!");
};
request.onsuccess = function(event) {
  db = event.target.result;
};

// let db;
// var request = indexedDB.open("industrialGrind");


// // handlers



// request.onerror = function(event) {
//     console.log("dank");
// };

// request.onsuccess = function(event) {
//     console.log("ohno!");
// };



// request.onupgradeneeded = function(e) {
//   // The database did not previously exist, so create object stores and indexes.
//   const db = request.result;
//   const store = db.createObjectStore("books", {keyPath: "isbn"});
//   const titleIndex = store.createIndex("by_title", "title", {unique: true});
//   const authorIndex = store.createIndex("by_author", "author");

//   // Populate with initial data.
//   store.put({title: "Quarry Memories", author: "Fred", isbn: 123456});
//   store.put({title: "Water Buffaloes", author: "Fred", isbn: 234567});
//   store.put({title: "Bedrock Nights", author: "Barney", isbn: 345678});

//   console.log("here")
// };

// request.onsuccess = function() {
//   db = request.result;
// };

// request.onsuccess = function() {
//     db = request.result;
// };

// function connectAB() {
//     console.log("hello B!")
// }

// window.onload(connectAB())

