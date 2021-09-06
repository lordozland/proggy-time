// let db;

// https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB
// https://www.w3.org/TR/IndexedDB/
// https://www.youtube.com/watch?v=n4E4kjQIw6M
// https://stackoverflow.com/questions/19609173/indexeddb-reference-error-db-is-not-defined

// var windowVar = (/*...*/);

if (indexedDB) {
    console.log("IndexedDB is supported");
}
else {
    alert("Indexed DB is not supported!");
};


let db;
var request = indexedDB.open("industrialGrind");

request.onupgradeneeded = function(event) {
    var db = event.target.result;
    db.createObjectStore('getMonz', {autoIncrement: true})
};

request.onerror = function(event) {
    console.error("Database error: " + event.target.errorCode);
  };

request.onsuccess = function(event) {
    db = event.target.result;
    // if (navigator.onLine) {
    //     playerOneSave();
    // }
  };

function playerOneSave(record) {
    var transaction = db.transaction(["saveGame"], "readwrite");
    var playerStore = transaction.objectStore("saveGame");
    playerStore.add(record);
}


// transaction.oncomplete = function(event) {
//     console.log("All done!");
//   };

window.addEventListener("onload", connectAB())

var objectStore = transaction.objectStore("customers");
customerData.forEach(function(customer) {
  var request = objectStore.add(customer);
  request.onsuccess = function(event) {
    // event.target.result === customer.ssn;
  };
});

