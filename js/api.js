const baseUrl = "https://api.football-data.org/v2";
const areaId = "2072"; // Area ID for England
const apiKey = "d4719c0751f042aaba705459e07d39f2";
const option = {
    headers:
    {
        "X-Auth-Token": apiKey
    }
};

// Block of code that will be called if the fetch is successful
function status(response) {
    if (response.status !== 200) {
        console.log("Error : " + response.status);
        // Method reject() akan membuat blok catch terpanggil
        return Promise.reject(new Error(response.statusText));
    } else {
        // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
        return Promise.resolve(response);
    }
}

// Block of code to parse json into a JavaScript array
function json(response) {
    return response.json();
}

// Code block to handle errors in the catch block
function error(error) {
    // Parameter error berasal dari Promise.reject()
    console.log("Error : " + error);
}

// Get all football competitions in England
function getCompetitions() {
    fetch(baseUrl + "/competitions?areas=" + areaId, option)
        .then(status)
        .then(json)
        .then(function (data) {
            // extract competitions data from API response and generate view from it
            generateCompetitionsView(data.competitions);
        })
        .catch(error);
}

// Get all favorite football competitions
function getFavoriteCompetitions() {
    getAllCompetition().then(function (favCompetitions) {
        generateFavCompetition(favCompetitions);
    });
}

// Get all football teams in England
function getTeams() {
    fetch(baseUrl + "/teams?areas=" + areaId, option)
        .then(status)
        .then(json)
        .then(function (data) {
            // extract teams data from API response and generate view from it
            generateTeamsView(data.teams);
        })
        .catch(error);
}

// Get all favorite football teams
function getFavoriteTeams() {
    getAllTeam().then(function (favTeams) {
        generateFavTeam(favTeams);
    });
}