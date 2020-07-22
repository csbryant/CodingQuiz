var startButton = document.getElementById('start-btn')
var nextButton = document.getElementById('next-btn')
var questionContainerEl = document.getElementById('question-container')
var questionEl = document.getElementById('question')
var answerButtonsEl = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerEl.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionEl.innerText = question.question
  question.answers.forEach(answer => {
    var button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsEl.appendChild(button)
  })
}

function resetState() {
  nextButton.classList.add('hide')
  while (answerButtonsEl.firstChild) {
    answerButtonsEl.removeChild(answerButtonsEl.firstChild)
  }
}

function selectAnswer(e) {
  var selectedButton = e.target
  var correct = selectedButton.dataset.correct
  Array.from(answerButtonsEl.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

var questions = [
  {
    question: 'Which function in javascript returns the largest integer less than or equal to a given number?',
    answers: [
      { text: 'Math.floor()', correct: true },
      { text: 'Math.abs()', correct: false },
      { text: 'Math.asin()', correct: false },
      { text: 'Math.tan()', correct: false }
    ]
  },
  {
    question: 'What does DOM stand for?',
    answers: [
      { text: 'Document Obtuse Molecule', correct: false },
      { text: 'Digital Object Model', correct: false },
      { text: 'Document Object Model', correct: true },
      { text: 'Digital Obstruct Markup', correct: false }
    ]
  },
  {
    question: 'Which Document method returns an Element object representing the element whose id property matches the specified string?',
    answers: [
      { text: 'getIdByElement()', correct: false },
      { text: 'getElementById()', correct: true },
      { text: 'grabElementById()', correct: false },
      { text: 'returnElementById', correct: false }
    ]
  },
  {
    question: 'Which of these events should fire when the user presses a key on the keyboard?',
    answers: [
      { text: '.onkeypress', correct: true },
      { text: '.onkey', correct: false },
      { text: '.downkey', correct: false },
      {text: '.keypress', correct: false}
    ]
  }
]