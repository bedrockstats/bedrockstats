const userInput = document.getElementById("userInput");
const errText = document.getElementById("errText");

// get tw stats elements
const twXP = document.getElementById("twXP");
const twTimesPlayed = document.getElementById("twTimesPlayed");
const twWins = document.getElementById("twWins");
const twFirstPlayed = document.getElementById("twFirstPlayed");
const twFinalKills = document.getElementById("twFinalKills");
const twKills = document.getElementById("twKills");
const twTreasuresDestroyed = document.getElementById("twTreasuresDestroyed");
const twDeaths = document.getElementById("twDeaths");
const twKDRatio = document.getElementById("twKDRatio");
const twPrestige = document.getElementById("twPrestige");

function handleErrors(response) {
  if (!response.ok) {
    errText.style.display = "block";
    errText.textContent = `Epic API Fail! Status code: ${response.status}`;
  }
  return response;
}

function getStats() {
  const username = userInput.value; // this will be used in the api request

  fetch(`https://api.playhive.com/v0/game/all/wars/${username}`)
    .then(handleErrors)
    .then((response) => {
      response.json().then(function (json) {
        errText.style.display = "none";
        fillStats(json);
      });
    });
}

function fillStats(json) {
  let firstPlayedNormal = new Date(json.first_played * 1000).toLocaleDateString(
    "en-US"
  );

  let kdRatio = json.kills / json.deaths;
  kdRatio = kdRatio.toFixed(1);

  console.log(json);

  twXP.textContent = `XP: ${json.xp}`;
  twTimesPlayed.textContent = `Times played: ${json.played}`;
  twWins.textContent = `Wins: ${json.victories}`;
  twFirstPlayed.textContent = `First played: ${firstPlayedNormal}`;
  twFinalKills.textContent = `Final kills: ${json.final_kills}`;
  twKills.textContent = `Kills: ${json.kills}`;
  twTreasuresDestroyed.textContent = `Treasures destroyed: ${json.treasure_destroyed}`;
  twDeaths.textContent = `Deaths: ${json.deaths}`;
  twPrestige.textContent = `Prestige: ${json.prestige}`;
  twKDRatio.textContent = `K/D: ${kdRatio}`;
}
