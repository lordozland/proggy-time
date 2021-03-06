if (indexedDB) {
    console.log("IndexedDB is supported");
}
else {
    alert("Indexed DB is not supported!");
};



var request = indexedDB.open("industrialGrind");
let db;

request.onupgradeneeded = function(event) {
    var db = event.target.result;
    db.createObjectStore('getMonz', {autoIncrement: true})
};

request.onerror = function(event) {
    console.error("Database error: " + event.target.errorCode);
  };

request.onsuccess = function(event) {
    db = event.target.result;
    if (navigator.onLine) {
        playerSave();
    }
  };

function playerOneSave(record) {
    var transaction = db.transaction(['saveGame'], 'readwrite');
    var playerStore = transaction.objectStore('saveGame');
    playerStore.add(record);
}

function playerSave() {
    var transaction = db.transaction(['saveGame'], 'readwrite');
    var playerStore = transaction.objectStore('saveGame');
    var allScorz = playerStore.getAll();

    allScorz.onsuccess = function () {
        if(allScorz.result.length > 0) {
            fetch("/api/transaction/", {
                method: POST,
                body: JSON.stringify(allScorz.results),
                headers: {
                    Accept: 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => {
                return response.json();
            })
            .then(() => {
                var transaction = db.transaction(['saveGame'], 'readwrite');
                var playerStore = transaction.objectStore('saveGame');
                playerStore.clear();
                console.log("here");
            })
            .catch((err) => {
                console.log(err);
            });
        }
    }
}


window.addEventListener('online', playerSave)



// https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB
// https://developer.mozilla.org/en-US/docs/Web/API/IDBObjectStore/getAll
// https://www.w3.org/TR/IndexedDB/
// https://www.youtube.com/watch?v=n4E4kjQIw6M
// https://stackoverflow.com/questions/19609173/indexeddb-reference-error-db-is-not-defined
// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch