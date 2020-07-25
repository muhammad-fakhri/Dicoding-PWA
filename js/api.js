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

// Function for change date format
function formatDate(dateString) {
    let date = new Date(dateString);
    let newDateString = date.toDateString();
    let splittedDate = newDateString.split(" ");
    return `${splittedDate[0]}, ${splittedDate[2]} ${splittedDate[1]} ${splittedDate[3]}`;
}

// Function for delay
function delay(t, v) {
    return new Promise(function (resolve) {
        setTimeout(resolve.bind(null, v), t)
    });
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
                        <img class="competition-emblem" 
                            src="${competition.emblemUrl ? competition.emblemUrl : "images/no-image.png"}" 
                            alt="Competition Emblem" />
                        <a class="btn-floating btn-large halfway-fab waves-effect waves-light pink accent-2" 
                            id="fav-comp-btn-${competition.id}"
                            onclick="M.toast({html: 'Favorited team ${competition.name}'});">
                            <i class="material-icons">favorite_border</i>
                        </a>
                    </div>
                    <div class="card-content">
                        <span class="card-title" id="competition-name">${competition.name}</span>
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

            // Hide the preloader and Display the competition data
            document.getElementById("competitions").innerHTML = competitionsHTML;
            competitions.forEach(function (competition) {
                // Add click event listener to favorite buttons
                document.getElementById("fav-comp-btn-" + competition.id).addEventListener('click', function (event) {
                    favoriteCompetition(competition);
                })
                // Check whether the competition has been added to favorite competition
                checkFavorite("competition", competition.id);
            });
        })
        .catch(error);
}

// Get all favorite football competitions
function getFavoriteCompetitions() {
    getAllCompetition().then(function (favCompetitions) {
        let favCompetitionsHTML = "";
        if (favCompetitions.length > 0) {
            favCompetitions.forEach(function (competition) {
                favCompetitionsHTML += `
                <div class="col s12 m4">
                    <div class="card">
                        <div class="card-image">
                            <img class="competition-emblem" 
                                src="${competition.emblemUrl ? competition.emblemUrl : "images/no-image.png"}"  
                                alt="Competition emblem" />
                            <a class="btn-floating btn-large halfway-fab waves-effect waves-light pink accent-2" 
                                id="fav-comp-btn-${competition.id}"
                                onclick="M.toast({html: 'Unfavorited ${competition.name}'});">
                                <i class="material-icons">favorite</i>
                            </a>
                        </div>
                        <div class="card-content">
                            <span class="card-title">${competition.name}</span>
                            <p>${competition.seasons} available seasons</p>
                            <h6>Current Season </h6>
                            <ul>
                                <li>Start Date : ${formatDate(competition.startDate)}</li>
                                <li>End Date : ${formatDate(competition.endDate)}</li>
                                <li>Matchday : ${competition.matchday ? competition.matchday : 0}</li>
                                <li>Winner : ${competition.winner ? competition.winner : 'No Winner'}</li>
                            </ul>
                        </div>
                    </div>
                </div>
                `;
            });
        } else {
            favCompetitionsHTML += `
                <h6 class="center-align">No favorite competition</h6>
            `;
        }


        delay(1000).then(function () { // Delay for 1 second
            // Hide the preloader and Display the favorite competition data
            document.getElementById("favorite-competitions").innerHTML = favCompetitionsHTML;

            // Add click event listener to favorite buttons
            favCompetitions.forEach(function (competition) {
                document.getElementById("fav-comp-btn-" + competition.id).addEventListener('click', function (event) {
                    favoriteCompetition(competition);
                })
            });
        });
    });
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
                            <img class="team-crest" 
                                src="${team.crestUrl ? team.crestUrl : "images/no-image.png"}" 
                                alt="Team Crest" />
                            <a class="btn-floating btn-large halfway-fab waves-effect waves-light pink accent-2"
                                id="fav-team-btn-${team.id}"
                                onclick="M.toast({html: 'Favorited team ${team.name}'});">
                                <i class="material-icons">favorite_border</i>
                            </a>
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

            // Hide the preloader and Load the team data
            document.getElementById("teams").innerHTML = teamsHTML;
            teams.forEach(function (team) {
                // Add click event listener to favorite buttons
                document.getElementById("fav-team-btn-" + team.id).addEventListener('click', function (event) {
                    favoriteTeam(team);
                })
                // Check whether the data has been added to favorite competition
                checkFavorite("team", team.id);
            });
        })
        .catch(error);
}

// Get all favorite football teams
function getFavoriteTeams() {
    getAllTeam().then(function (favTeams) {
        let favTeamsHTML = "";
        if (favTeams.length > 0) {
            favTeams.forEach(function (team) {
                favTeamsHTML += `
                <div class="col s12 m4">
                    <div class="card hoverable">
                        <div class="card-image team-crest-wrapper">
                            <img class="team-crest" 
                                src="${team.crestUrl ? team.crestUrl : "images/no-image.png"}" 
                                alt="Team Crest" />
                            <a class="btn-floating btn-large halfway-fab waves-effect waves-light pink accent-2"
                                id="fav-team-btn-${team.id}"
                                onclick="M.toast({html: 'Unfavorite team ${team.name}'});">
                                <i class="material-icons">favorite</i>
                            </a>
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
        } else {
            favTeamsHTML += `
                <h6 class="center-align">No favorite team</h6>
            `;
        }

        delay(1000).then(function () { // Delay for 1 second
            // Hide the preloader and Display the favorite competition data
            document.getElementById("favorite-teams").innerHTML = favTeamsHTML;

            // Add click event listener to favorite buttons
            favTeams.forEach(function (team) {
                document.getElementById("fav-team-btn-" + team.id).addEventListener('click', function (event) {
                    favoriteTeam(team);
                })
            });
        });
    });
}