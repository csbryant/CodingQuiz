//Variables

var score = 0;
var questionIndex = 0;
var currentTime = document.querySelector("#currentTime");
var timer = document.querySelector("#menu");
var questionsDiv = document.querySelector("#questionsDiv");
var playerMessage = document.querySelector("#playerMessage");

var secondsLeft = 100;
var penalty = 10;
var holdInterval = 0;
var questionBox = document.createElement("ul");



//Timer

timer.addEventListener("click", function () {
    if (holdInterval === 0) {
        holdInterval = setInterval(function () {
            secondsLeft--;
            currentTime.textContent = "Time: " + secondsLeft;

            if (secondsLeft <= 0) {
                clearInterval(holdInterval);
                results();
                currentTime.textContent = "Time is up!";
            }
        }, 1000);
    }
    displayQuestions(questionIndex);
});



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
            secondsLeft -= penalty;
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
    currentTime.innerHTML = "";

    // Heading:
    var createResults = document.createElement("h1");
    createResults.setAttribute("id", "createH1");
    createResults.textContent = "Results"

    questionsDiv.appendChild(createResults);

    // Paragraph
    var createP = document.createElement("p");
    createP.setAttribute("id", "createP");

    questionsDiv.appendChild(createP);

    // Calculates time remaining and replaces it with score
    if (secondsLeft >= 0) {
        var timeRemaining = secondsLeft;
        var createP2 = document.createElement("p");
        clearInterval(holdInterval);
        createP.textContent = "Your final score is " + secondsLeft + " seconds with " + score + "/" + questions.length + " questions correct!";

        questionsDiv.appendChild(createP2);
    }

    // Enters Name
    var createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "Enter your name: ";

    questionsDiv.appendChild(createLabel);

    // input
    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
    createInput.textContent = "";

    questionsDiv.appendChild(createInput);

    // submit
    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "menu");
    createSubmit.setAttribute("id", "menu");
    createSubmit.textContent = "Submit";

    questionsDiv.appendChild(createSubmit);

    // Add High Scores
    createSubmit.addEventListener("click", function () {
        var initials = createInput.value;

        if (initials === null) {

            console.log("No value entered!");

        } else {
            var finalScore = {
                initials: initials,
                score: timeRemaining
            }
            console.log(finalScore);
            var allScores = localStorage.getItem("allScores");
            if (allScores === null) {
                allScores = [];
            } else {
                allScores = JSON.parse(allScores);
            }
            allScores.push(finalScore);
            var newScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", newScore);
            window.location.replace("./HighScores.html");
        }
    });

}

//Questions

var questions = [
    {
      question: 'Which function in javascript returns the largest integer less than or equal to a given number?',
      choices: ['Math.floor()', 'Math.abs()', 'Math.asin()', 'Math.tan()'],
      answer: 'Math.floor()'
    },

    {
    question: 'What does DOM stand for?',
    choices: ['Document Obtuse Molecule', 'Digital Object Model', 'Document Object Model', 'Digital Obstruct Markup'],
    answer: 'Document Object Model'
    },

    {
    question: 'Which Document method returns an Element object representing the element whose id property matches the specified string?',
    choices: ['getIdByElement()', 'getElementById()', 'grabElementById()', 'returnElementById'],
    answer: 'getElementById()'
    },

    {
    question: 'Which of these events should fire when the user presses a key on the keyboard?',
    choices: ['.onkeypress', '.onkey', '.downkey', '.keypress'],
    answer: '.onkeypress'
    }
];
