var displayScore = document.querySelector("#displayscores");
var back = document.querySelector("#return");
var highScores = localStorage.getItem("highScores");
highScores = JSON.parse(highScores);

if (highScores !== null) {
for (let index = 0; index < highScores.length; index++) {
    var scoreList = document.createElement("ul");
    scoreList.textContent = highScores[index].name + " " + highScores[index].score;
    displayScore.appendChild(scoreList);
}
}

back.addEventListener("click", function () {
    window.location.replace("https://csbryant.github.io/CodingQuiz/");
});