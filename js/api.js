const baseUrl = "https://api.football-data.org/v2";
const areaId = "2072"; // Area ID for England
const apiKey = "d4719c0751f042aaba705459e07d39f2";
const option = {
    headers:
    {
        "X-Auth-Token": apiKey
    }
};

// Blok kode yang akan di panggil jika fetch berhasil
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
// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
    return response.json();
}
// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
    // Parameter error berasal dari Promise.reject()
    console.log("Error : " + error);
}

// Function for change date format
function formatDate(dateString) {
    let date = new Date(dateString);
    let newDateString = date.toDateString();
    let splittedDate = newDateString.split(" ");
    return `${splittedDate[0]}, ${splittedDate[2]} ${splittedDate[1]} ${splittedDate[3]}`;
}

// Get all football competitions in England
function getCompetitions() {
    fetch(baseUrl + "/competitions?areas=" + areaId, option)
        .then(status)
        .then(json)
        .then(function (data) {
            // extract competitions data from API response
            let competitions = data.competitions;
            let competitionsHTML = "";
            competitions.forEach(function (competition) {
                competitionsHTML += `
                <div class="col s12 m4">
                <div class="card hoverable">
                    <div class="card-image">
                        <img src="${competition.emblemUrl ? competition.emblemUrl : "images/no-image.png"}">
                        <a class="btn-floating btn-large halfway-fab waves-effect waves-light pink accent-2"><i
                                class="material-icons">favorite_border</i></a>
                    </div>
                    <div class="card-content">
                        <span class="card-title">${competition.name}</span>
                        <p>${competition.numberOfAvailableSeasons} available seasons</p>
                        <h6>Current Season </h6>
                        <ul>
                            <li>Start Date : ${formatDate(competition.currentSeason.startDate)}</li>
                            <li>End Date : ${formatDate(competition.currentSeason.endDate)}</li>
                            <li>Matchday : ${competition.currentSeason.currentMatchday ? competition.currentSeason.currentMatchday : 0}</li>
                            <li>Winner : ${competition.currentSeason.winner ? competition.currentSeason.winner : 'No Winner'}</li>
                        </ul>
                    </div>
                </div>
            </div>
            `;
            });

            // Hide the preloader
            document.getElementById("competition-preloader").classList.remove("active");
            // Load the competition data
            document.getElementById("competitions").innerHTML = competitionsHTML;
        })
        .catch(error);
}

// Get all football teams in England
function getTeams() {
    fetch(baseUrl + "/teams?areas=" + areaId, option)
        .then(status)
        .then(json)
        .then(function (data) {
            // extract teams data from API response
            let teams = data.teams;
            let teamsHTML = "";
            teams.forEach(function (team) {
                teamsHTML += `
                <div class="col s12 m4">
                <div class="card hoverable">
                    <div class="card-image team-crest-wrapper">
                        <img class="team-crest" src="${team.crestUrl ? team.crestUrl : "images/no-image.png"}">
                        <a class="btn-floating btn-large halfway-fab waves-effect waves-light pink accent-2"><i
                        class="material-icons">favorite_border</i></a>
                    </div>
                    <div class="card-content team-content">
                        <span class="card-title" id="team-name">${team.name}</span>
                        <p>Est since ${team.founded}. Their base is at ${team.venue}, ${team.address}</p>
                    </div>
                    <div class="card-action">
                        <a href="${team.website}" target="_blank" class="pink-text accent-2">Visit website</a>
                    </div>
                </div>
            </div>
            `;
            });

            // Hide the preloader
            document.getElementById("team-preloader").classList.remove("active");
            // Load the competition data
            document.getElementById("teams").innerHTML = teamsHTML;
        })
        .catch(error);
}

export { getCompetitions, getTeams };