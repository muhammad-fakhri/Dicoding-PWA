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
        dbPromised
            .then(function (db) {
                var tx = db.transaction("articles", "readonly");
                var store = tx.objectStore("articles");
                return store.getAll();
            })
            .then(function (articles) {
                resolve(articles);
            });
    });
}

function favoriteCompetition(competition) {
    dbPromise
        .then(function (db) {
            // check data, exist in database or not
            let data = getCompetitionById(competition.id);
            data.then(function (val) {
                if (val === undefined) {
                    let tx = db.transaction("competitions", "readwrite");
                    let store = tx.objectStore("competitions");
                    // data not exist, then add it
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
                    console.log(competition.name + " competition successfully favorited");
                    return tx.complete;
                } else {
                    // data exist, display message there are alredy data in database
                    console.log(competition.name + " competition already exist in database");
                }
            }).then(function () {
                // Change favorite button icon to favorite icon
                document.querySelector(`#fav-comp-btn-${competition.id} i`).innerHTML = "favorite";
            })
        })
        .catch(function () {
            // data exist, display message there are alredy data in database
            console.log("Error when favoriting competition " + competition.name);
        });
}