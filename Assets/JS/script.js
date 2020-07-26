//Variables

var score = 0;
var questionIndex = 0;
var timer = document.querySelector("#timer");
var countDown = document.querySelector("#menu");
var questionsDiv = document.querySelector("#questionsDiv");
var playerMessage = document.querySelector("#playerMessage");


//Variables for timer
var secondsScore = 100;
var penalty = 10;
var interval = 0;
var questionBox = document.createElement("ul");


//Start Button setting off timer

countDown.addEventListener("click", function () {
    if (interval === 0) {
        interval = setInterval(function () {
            secondsScore--;
            timer.textContent = "Time: " + secondsScore;

            if (secondsScore <= 0) {
                clearInterval(interval);
                results();
                timer.textContent = "You are out of time!";
                playerMessage.textContent = ""
            }
        }, 1000);
    }
    displayQuestions(questionIndex);
});


//Creates questions as list elements

function displayQuestions(questionIndex) {
    questionsDiv.innerHTML = "";
    questionBox.innerHTML = "";

    for (var i = 0; i < questions.length; i++) {
        var userQuestion = questions[questionIndex].question;
        var userChoices = questions[questionIndex].choices;
        questionsDiv.textContent = userQuestion;
    }

    userChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        questionsDiv.appendChild(questionBox);
        questionBox.appendChild(listItem);
        listItem.addEventListener("click", (rightOrWrong));
    })
}


// Checks if answer was right or wrong

function rightOrWrong(event) {
    var selection = event.target;

    if (selection.matches("li")) {

        if (selection.textContent == questions[questionIndex].answer) {
            score++;
            playerMessage.textContent = "Correct! The answer is:  " + questions[questionIndex].answer;
  
        } else {
            playerMessage.textContent = "Wrong! The correct answer is:  " + questions[questionIndex].answer;
            secondsScore -= penalty;
        }

    }
    questionIndex++;

    if (questionIndex >= questions.length) {
        results();
        playerMessage.textContent = ""
    } else {
        displayQuestions(questionIndex);
    }

}

//Results

function results() {
    questionsDiv.innerHTML = "";
    timer.innerHTML = "";

    var createResults = document.createElement("h1");
    createResults.setAttribute("id", "createH1");
    createResults.textContent = "Results"

    questionsDiv.appendChild(createResults);

    var createP = document.createElement("p");
    createP.setAttribute("id", "createP");

    questionsDiv.appendChild(createP);

    // shows score
    if (secondsScore >= 0) {
        var createP2 = document.createElement("p");
        clearInterval(interval);
        createP.textContent = "Your final score is " + secondsScore + " seconds with " + score + "/" + questions.length + " questions correct!";

        questionsDiv.appendChild(createP2);
    }

    // enters name
    var createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "Enter your name: ";

    questionsDiv.appendChild(createLabel);

    // input
    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "name");
    questionsDiv.appendChild(createInput);

    // submit
    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "menu");
    createSubmit.setAttribute("id", "menu");
    createSubmit.textContent = "Submit";

    questionsDiv.appendChild(createSubmit);

    // saves name and score
    createSubmit.addEventListener("click", function() {
        var highScores = localStorage.getItem("highScores")
       if (highScores) {
        highScores = JSON.parse(localStorage.getItem("highScores"))
        }
        else {
        highScores = [];
        } 
    var userScore = {
        "name": createInput.value,
        "score": secondsScore
    }
    highScores.push(userScore)
    var stringifyHighScores = JSON.stringify(highScores);
    localStorage.setItem("highScores", stringifyHighScores);
    window.location.replace("./highscores.html") ;
    })
}