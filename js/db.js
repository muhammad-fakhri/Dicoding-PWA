const dbPromise = idb.open("vanir", 1, function (upgradeDb) {
    const competitionsObjectStore = upgradeDb.createObjectStore("competitions", {
        keyPath: "id"
    });
    const teamsObjectStore = upgradeDb.createObjectStore("teams", {
        keyPath: "id"
    });
    competitionsObjectStore.createIndex("name", "name", { unique: false });
    teamsObjectStore.createIndex("name", "name", { unique: false });
});

function checkFavorite(type, id) {
    dbPromise
        .then(function (db) {
            if (type === "competition") {
                let tx = db.transaction("competitions", "readonly");
                let store = tx.objectStore("competitions");
                return store.get(id);
            } else {
                let tx = db.transaction("teams", "readonly");
                let store = tx.objectStore("teams");
                return store.get(id);
            }
        }).then(function (data) {
            if (data !== undefined) {
                if (type === "competition") {
                    // Change favorite button icon to favorite icon
                    document.querySelector(`#fav-comp-btn-${data.id} i`).innerHTML = "favorite";
                    // Change toast message
                    document.querySelector(`#fav-comp-btn-${data.id}`)
                        .setAttribute("onClick", `M.toast({html: 'Unfavorited competition ${data.name}'})`);
                } else {
                    // Change favorite button icon to favorite icon
                    document.querySelector(`#fav-team-btn-${data.id} i`).innerHTML = "favorite";
                    // Change toast message
                    document.querySelector(`#fav-team-btn-${data.id}`)
                        .setAttribute("onClick", `M.toast({html: 'Unfavorited team ${data.name}'})`);
                }
            }
        });
}

function getCompetitionById(id) {
    return new Promise(function (resolve, reject) {
        dbPromise
            .then(function (db) {
                let tx = db.transaction("competitions", "readonly");
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
        store.put(item);
        return tx.complete;
    }).then(function () {
        console.log("Favorited competition " + competition.name);
        // Change favorite button icon to favorite icon
        document.querySelector(`#fav-comp-btn-${competition.id} i`).innerHTML = "favorite";
        // Change toast message
        document.querySelector(`#fav-comp-btn-${competition.id}`)
            .setAttribute("onClick", `M.toast({html: 'Unfavorited competition ${competition.name}'})`);
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
            .setAttribute("onClick", `M.toast({html: 'Favorited competition ${competition.name}'})`);
    });
}

function favoriteCompetition(competition) {
    dbPromise
        .then(function (db) {
            // check data, exist in database or not
            let data = getCompetitionById(competition.id);
            data.then(function (val) {
                if (val === undefined) {
                    // data not exist, favorited competition
                    addCompetition(competition);
                } else {
                    // data exist, unfavorited competition
                    deleteCompetition(competition);
                }
            });
        })
        .catch(function () {
            console.log("Error when favoriting competition " + competition.name);
        });
}

function getTeamById(id) {
    return new Promise(function (resolve, reject) {
        dbPromise
            .then(function (db) {
                let tx = db.transaction("teams", "readonly");
                let store = tx.objectStore("teams");
                return store.get(id);
            }).then(function (team) {
                resolve(team);
            });
    });
}

function getAllTeam() {
    return new Promise(function (resolve, reject) {
        dbPromise
            .then(function (db) {
                let tx = db.transaction("teams", "readonly");
                let store = tx.objectStore("teams");
                return store.getAll();
            })
            .then(function (teams) {
                resolve(teams);
            });
    });
}

function addTeam(team) {
    dbPromise.then(function (db) {
        let tx = db.transaction("teams", "readwrite");
        let store = tx.objectStore("teams");
        let item = {
            id: team.id,
            name: team.name,
            crestUrl: team.crestUrl,
            founded: team.founded,
            venue: team.venue,
            address: team.address,
            website: team.website
        };
        store.add(item);
        return tx.complete;
    }).then(function () {
        console.log("Favorited team " + team.name);
        // Change favorite button icon to favorite icon
        document.querySelector(`#fav-team-btn-${team.id} i`).innerHTML = "favorite";
        // Change toast message
        document.querySelector(`#fav-team-btn-${team.id}`)
            .setAttribute("onClick", `M.toast({html: 'Unfavorited team ${team.name}'})`);
    });
}

function deleteTeam(team) {
    dbPromise.then(function (db) {
        let tx = db.transaction("teams", "readwrite");
        let store = tx.objectStore("teams");
        store.delete(team.id);
        return tx.complete;
    }).then(function () {
        console.log("Unfavorited team " + team.name);
        // Change favorite button icon to favorite_border icon
        document.querySelector(`#fav-team-btn-${team.id} i`).innerHTML = "favorite_border";
        // Change toast message
        document.querySelector(`#fav-team-btn-${team.id}`)
            .setAttribute("onClick", `M.toast({html: 'Favorited team ${team.name}'})`);
    });
}

function favoriteTeam(team) {
    dbPromise
        .then(function (db) {
            // check data, exist in database or not
            let data = getTeamById(team.id);
            data.then(function (val) {
                if (val === undefined) {
                    // data not exist, favorited team
                    addTeam(team);
                } else {
                    // data exist, unfavorited team
                    deleteTeam(team);
                }
            });
        })
        .catch(function () {
            console.log("Error when favoriting team " + team.name);
        });
}