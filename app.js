const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const restartButton = document.getElementById("restart-btn");
const resultDiv = document.getElementById("result");

let shuffledQuestions, currentQuestionIndex, score;

const questions = [
      {
        question: "What does the box model in CSS consist of?",
        answers: [
            {text: "Content, padding, border, margin", correct: true},
            {text: "Width, height, background, border", correct: false},
            {text: "Padding, margin, background, width", correct: false},
            {text: "Content, width, height, border", correct: false},
        ],
      },

      {
        question: "What is the default display value for most HTML elements?",
        answers: [
            {text: "inline-block", correct: false},
            {text: "block or inline", correct: true},
            {text: "flex", correct: false},
            {text: "none", correct: false},
        ],
      },

      {
        question: "Which property can be used to add space inside an input field?",
        answers: [
            {text: "padding", correct: true},
            {text: "space", correct: false},
            {text: "margin", correct: false},
            {text: "border", correct: false},
        ],
      },

      {
        question: "In which HTML element is the Favicon defined?",
        answers: [
            {text: "The <img> element", correct: false},
            {text: "The <body> element", correct: false},
            {text: "The <link> element", correct: true},
            {text: "The <style> element", correct: false},
        ],
      },

      {
        question: "What is the correct tag name for a table-cell in HTML?",
        answers: [
            {text: "<tc>", correct: false},
            {text: "<td>", correct: true},
            {text: "<tr>", correct: false},
            {text: "<th>", correct: false},
        ],
      },

      {
        question: "What is NOT a correct syntax for declaring variables??",
        answers: [
            {text: "let x;", correct: false},
            {text: "dim x;", correct: true},
            {text: "var x;", correct: false},
            {text: "const x;", correct: false},
        ],
      },

      {
        question: "What is the correct HTML event attribute to execute something when a user clicks on an element??",
        answers: [
            {text: "ontap", correct: false},
            {text: "onmouseclick", correct: false},
            {text: "clickme", correct: false},
            {text: "onclick", correct: true},
        ],
      },

      {
        question: "What is NOT a legal way to create an array?",
        answers: [
            {text: "const fruits = ['Orange', 'Banana', 'Apple'];", correct: false},
            {text: "const fruits = new Array ('Orange', 'Banana', 'Apple');", correct: false},
            {text: "const fruits = ('Orange', 'Banana', 'Apple');", correct: true},
            {text: "none of the options", correct: false},
        ],
      },

      {
        question: "Variables created with the const keyword can never change their value.",
        answers: [
            {text: "True", correct: true},
            {text: "False", correct: false},
            {text: "It applies to let", correct: false},
            {text: "none of the options", correct: false},
        ],
      },

      {
        question: "How can you select only text input fields in a form?",
        answers: [
            {text: "input[type=string]", correct: false},
            {text: "input[type=field]", correct: false},
            {text: "input[type=text]", correct: true},
            {text: "input[text]", correct: false},
        ],
      },

];

startQuiz();

function startQuiz() {
    score = 0;
    questionContainer.style.display = "flex";
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    nextButton.classList.remove("hide");
    restartButton.classList.add("hide");
    resultDiv.classList.add("hide");
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
  }

  function showQuestion(question){
     questionElement.innerText = question.question;
    question.answers.forEach((answer, index) => {
      const inputGroup =  document.createElement("div");
      inputGroup.classList.add("input-group");

      const radio = document.createElement("input");
      radio.type = "radio";
      radio.id = "answer" + index;
      radio.name = "answer";
      radio.value = index;

      const label = document.createElement("label");
      label.htmlFor = "answer" + index;
      label.innerText = answer.text;

      inputGroup.appendChild(radio);
      inputGroup.appendChild(label);
      answerButtons.appendChild(inputGroup);
    });
}

function resetState() {
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

nextButton.addEventListener("click", () => {
  const answerIndex = Array.from(
    answerButtons.querySelectorAll("input")).findIndex((radio) => radio.checked);
    if (answerIndex !== -1) {
      if (shuffledQuestions[currentQuestionIndex].answers[answerIndex].correct) {
        score++;
      }
      currentQuestionIndex++;
      if (shuffledQuestions.length > currentQuestionIndex) {
        setNextQuestion();
      } else {
        endQuiz();
      }
    
    } else {
      alert("please select an answer.");
    }
});

restartButton.addEventListener("click", startQuiz);

function endQuiz() {
  questionContainer.style.display = "none";
  nextButton.classList.add("hide");
  restartButton.classList.remove("hide");
  resultDiv.classList.remove("hide");
  resultDiv.innerText = `Final quiz score: ${score} / ${shuffledQuestions.length}`;
}