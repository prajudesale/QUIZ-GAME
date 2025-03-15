const quizData = [
  {
    question: "Who was the chief general (Senapati) of Chhatrapati Shivaji Maharaj’s army??",
    options: ["Tanaji Malusare", "Netaji Palkar", "Kanhoji Angre", "Bajiprabhu Deshpande"],
    answer: "Netaji Palkar"
  },
  {
    question: "Who was the first Indian cricketer to score a double century in Test cricket?",
    options: ["Sunil Gavaskar", "Sachin Tendulkar", "Vinoo Mankad", "Virender Sehwag"],
    answer: "Vinoo Mankad"
  },
  {
    question: "Who was the captain of the Indian cricket team when they won the 1983 Cricket World Cup?",
    options: ["Sunil Gavaskar", "Kapil Dev", "Mohinder Amarnath", "Ravi Shastri"],
    answer: "Kapil Dev"
  },
  {
      question: "Who was the first Indian to become the President of the United Nations General Assembly?",
      options: ["Indira Gandhi", "Sarojini Naidu", "Vijaya Lakshmi Pandit", "Sushma Swaraj"],
      answer: "Vijaya Lakshmi Pandit"
  },
  {
      question: "Which Maratha warrior defended the Sinhagad Fort and sacrificed his life in 1670?",
      options: ["Tanaji Malusare", "Bajiprabhu Deshpande", "Yesaji Kank", "Firangoji Narsala"],
      answer: "Tanaji Malusare"
  },
  {
    question: "In which year did India win its first Cricket World Cup?",
    options: ["1987", "1983", "1992", "1979"],
    answer: "1983"
  },
  {
    question: "Which Indian freedom fighter gave the slogan 'Give me blood, and I will give you freedom'?",
    options: ["Mahatma Gandhi", "Subhas Chandra Bose", "Bhagat Singh", "Bal Gangadhar Tilak"],
    answer: "Subhas Chandra Bose"
  },
  {
    question: "Which fort was the first capital of Shivaji Maharaj?",
    options: ["Pratapgad", "Raigad", "Torna", "Sinhagad"],
    answer: "Torna"
  },
  {
    question: "Who was the first captain of the Indian Test cricket team?",
    options: ["CK Nayudu", "Lala Amarnath", "Kapil Dev", "Sunil Gavaskar"],
    answer: "CK Nayudu"
  },
  {
    question: "Who was the chief general (Senapati) of Chhatrapati Shivaji Maharaj’s army?",
    options: ["Tanaji Malusare", "Netaji Palkar", "Kanhoji Angre", "Bajiprabhu Deshpande"],
    answer: "Netaji Palkar"
  }
  
];

const quizContainer = document.getElementById("quiz");
const resultContainer = document.getElementById("result");
const submitButton = document.getElementById("submit");
const lifelineButton = document.getElementById("lifeline");
const timerDisplay = document.getElementById("time");
const timerContainer = document.getElementById("timer");
const beepSound = document.getElementById("beep");


let currentQuestion = 0;
let score = 0;
let timeLeft = 20; // Time per question (in seconds)
let timer;
let lifelineUsed = false; // Track if the lifeline has been used



// Function to shuffle the quiz data
function shuffleQuizData() {
  for (let i = quizData.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [quizData[i], quizData[j]] = [quizData[j], quizData[i]]; // Swap elements
  } 
}


// Function to start the timer
function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = timeLeft;

    // Change color and play sound during the last 3 seconds
    if (timeLeft <= 5) {
      timerContainer.classList.add("critical");
      beepSound.play(); // Play the beep sound
    } else {
      timerContainer.classList.remove("critical");
    }

    if (timeLeft <= 0) {
      clearInterval(timer);
      handleTimeout();
    }
  }, 1000);
}


// Function to handle timeout
function handleTimeout() {
  resultContainer.textContent = "Time's up! Moving to the next question.";
  setTimeout(() => {
    nextQuestion();
  }, 2000); // Wait 2 seconds before moving to the next question
}


// Function to check the answer
function checkAnswer() {
  clearInterval(timer); // Stop the timer
  const selectedOption = document.querySelector('input[name="option"]:checked');
  if (selectedOption) {
    if (selectedOption.value === questions[currentQuestion].answer) {
      score++;
      nextQuestion();
    } else {
      // Add animation for wrong answer
      quizContainer.classList.add("wrong-answer");
      setTimeout(() => {
        quizContainer.classList.remove("wrong-answer");
        gameOver(); // End the game after the animation
      }, 500); // Match the duration of the animation
    }
  } else {
    resultContainer.textContent = "Please select an answer!";
  }
}

// Function to display the current question
function displayQuestion() {
  const questionData = quizData[currentQuestion];
  quizContainer.innerHTML = `
    <h2>${questionData.question}</h2>
    ${questionData.options.map((option, index) => `
      <label>
        <input type="radio" name="option" value="${option}">
        ${option}
      </label>
    `).join("")}
  `;
  timeLeft = 20; // Reset timer for each question
  timerDisplay.textContent = timeLeft;
  timerContainer.classList.remove("critical"); // Reset timer color
  startTimer();
}

// Function to check the answer
function checkAnswer() {
  clearInterval(timer); // Stop the timer
  const selectedOption = document.querySelector('input[name="option"]:checked');
  if (selectedOption) {
    if (selectedOption.value === quizData[currentQuestion].answer) {
      score++;
      nextQuestion();
    } else {
      gameOver(); // End the game if the answer is wrong
    }
  } else {
    resultContainer.textContent = "Please select an answer!";
  }
}

// Function to handle game over
function gameOver() {
  quizContainer.innerHTML = `
    <h2>Game Over!</h2>
    <p>You selected a wrong answer.</p>
    <p>Your final score is ${score}/${quizData.length}.</p>
    <button id="restart" class="btn">Restart Quiz</button>
  `;
  resultContainer.textContent = "";
  submitButton.style.display = "none";
  lifelineButton.style.display = "none";

  // Add event listener for the restart button
  document.getElementById("restart").addEventListener("click", () => {
    currentQuestion = 0;
    score = 0;
    lifelineUsed = false;
    lifelineButton.disabled = false;
    lifelineButton.style.display = "inline-block";
    shuffleQuizData(); // Shuffle questions again on restart
    displayQuestion();
    submitButton.style.display = "block";
  });
}

// Function to move to the next question
function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    displayQuestion();
    resultContainer.textContent = "";
  } else {
    showResult();
  }
}

// Function to show the final result
function showResult() {
  quizContainer.innerHTML = "";
  resultContainer.innerHTML = `Your score is ${score}/${quizData.length}`;
  submitButton.style.display = "none";
  lifelineButton.style.display = "none";
}

// Function to use the 50-50 lifeline
function useFiftyFifty() {
  const questionData = quizData[currentQuestion];
  const correctAnswer = questionData.answer;
  const incorrectOptions = questionData.options.filter((option) => option !== correctAnswer);

  // Randomly select two incorrect options to remove
  const optionsToRemove = incorrectOptions.sort(() => 0.5 - Math.random()).slice(0, 2);

  // Hide the selected incorrect options
  document.querySelectorAll('input[name="option"]').forEach((input) => {
    if (optionsToRemove.includes(input.value)) {
      input.parentElement.style.display = "none";
    }
  });

  lifelineButton.disabled = true; // Disable the lifeline button after use
  lifelineUsed = true;
}

// Event listener for the submit button
submitButton.addEventListener("click", checkAnswer);

// Event listener for the 50-50 lifeline button
lifelineButton.addEventListener("click", useFiftyFifty);

// Shuffle questions and start the quiz
shuffleQuizData();
displayQuestion();