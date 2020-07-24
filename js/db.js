const dbPromised = idb.open("vanir", 1, function (upgradeDb) {
    const competitionsObjectStore = upgradeDb.createObjectStore("competitions", {
        keyPath: "id"
    });
    competitionsObjectStore.createIndex("name", "name", { unique: false });
});

function favoriteCompetition(competition) {
    dbPromised
        .then(function (db) {
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
        })
        .then(function () {
            console.log(competition.name + " competition successfully favorited");
            // Change favorite button icon to favorite icon
            document.querySelector(`#fav-comp-btn-${competition.id} i`).innerHTML = "favorite";
        })
        .catch(function () {
            console.log(competition.name + " competition failed favorited");
        });
}

export { favoriteCompetition };