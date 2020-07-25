const dbPromise = idb.open("vanir", 1, function (upgradeDb) {
    const competitionsObjectStore = upgradeDb.createObjectStore("competitions", {
        keyPath: "id"
    });
    competitionsObjectStore.createIndex("name", "name", { unique: false });
});

function getCompetitionById(id) {
    return new Promise(function (resolve, reject) {
        dbPromise
            .then(function (db) {
                // check data, exist in database or not
                let tx = db.transaction("competitions", "readwrite");
                let store = tx.objectStore("competitions");
                return store.get(id);
            }).then(function (competition) {
                resolve(competition);
            });
    });
}

function getAllCompetition() {
    return new Promise(function (resolve, reject) {
        dbPromise
            .then(function (db) {
                let tx = db.transaction("competitions", "readonly");
                let store = tx.objectStore("competitions");
                return store.getAll();
            })
            .then(function (competitions) {
                resolve(competitions);
            });
    });
}

function addCompetition(competition) {
    dbPromise.then(function (db) {
        let tx = db.transaction("competitions", "readwrite");
        let store = tx.objectStore("competitions");
        let item = {
            id: competition.id,
            name: competition.name,
            emblemUrl: competition.emblemUrl,
            seasons: competition.numberOfAvailableSeasons,
            startDate: competition.currentSeason.startDate,
            endDate: competition.currentSeason.endDate,
            matchday: competition.currentSeason.currentMatchday,
            winner: competition.currentSeason.winner
        };
        store.add(item);
        return tx.complete;
    }).then(function () {
        console.log("Favorited competition " + competition.name);
        // Change favorite button icon to favorite icon
        document.querySelector(`#fav-comp-btn-${competition.id} i`).innerHTML = "favorite";
        // Change toast message
        document.querySelector(`#fav-comp-btn-${competition.id}`)
            .setAttribute("onClick", `M.toast({html: 'Unfavorited ${competition.name}'})`);
    });
}

function deleteCompetition(competition) {
    dbPromise.then(function (db) {
        let tx = db.transaction("competitions", "readwrite");
        let store = tx.objectStore("competitions");
        store.delete(competition.id);
        return tx.complete;
    }).then(function () {
        console.log("Unfavorited competition " + competition.name);
        // Change favorite button icon to favorite_border icon
        document.querySelector(`#fav-comp-btn-${competition.id} i`).innerHTML = "favorite_border";
        // Change toast message
        document.querySelector(`#fav-comp-btn-${competition.id}`)
            .setAttribute("onClick", `M.toast({html: 'Favorited ${competition.name}'})`);
    });
}

function favoriteCompetition(competition) {
    dbPromise
        .then(function (db) {
            // check data, exist in database or not
            let data = getCompetitionById(competition.id);
            data.then(function (val) {
                if (val === undefined) {
                    // favorited competition
                    // data not exist, then add it
                    addCompetition(competition);
                } else {
                    // unfavorited competition
                    // data exist, delete data from database
                    deleteCompetition(competition);
                }
            });
        })
        .catch(function () {
            // data exist, display message there are alredy data in database
            console.log("Error when favoriting competition " + competition.name);
        });
}