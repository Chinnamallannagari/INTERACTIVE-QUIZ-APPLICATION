// Quiz Data
const quizData = [
    {
        question: "What is the capital of France?",
        options: ["Paris", "London", "Berlin", "Rome"],
        answer: "Paris",
    },
    {   
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Saturn"],
        answer: "Mars",
    },
    {
        question: "What is the largest mammal?",
        options: ["Elephant", "Blue Whale", "Shark", "Giraffe"],
        answer: "Blue Whale",
    },
    {
        question: "Which language is primarily spoken in Brazil?",
        options: ["Spanish", "Portuguese", "French", "English"],
        answer: "Portuguese",
    }
];

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeRemaining = 20; // Time for each question in seconds

// Load a new question
function loadQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    document.getElementById('question-text').textContent = currentQuestion.question;
    const buttonsContainer = document.getElementById('answer-buttons');
    buttonsContainer.innerHTML = ""; // Clear previous buttons

    currentQuestion.options.forEach(option => {
        const button = document.createElement('button');
        button.classList.add('option-button');
        button.textContent = option;
        button.onclick = () => checkAnswer(option);
        buttonsContainer.appendChild(button);
    });

    document.getElementById('next-button').style.display = "none"; // Hide next button
    document.getElementById('feedback-text').textContent = ""; // Clear feedback text
    document.getElementById('timer-text').textContent = `Time Remaining: ${timeRemaining}s`;
    startTimer();
}

// Start the timer
function startTimer() {
    timer = setInterval(() => {
        timeRemaining--;
        document.getElementById('timer-text').textContent = `Time Remaining: ${timeRemaining}s`;

        if (timeRemaining <= 0) {
            clearInterval(timer);
            checkAnswer(""); // Time's up, check the answer
        }
    }, 1000);
}

// Check if the selected answer is correct
function checkAnswer(selectedAnswer) {
    clearInterval(timer); // Stop the timer once an answer is selected
    const currentQuestion = quizData[currentQuestionIndex];
    const feedbackText = document.getElementById('feedback-text');
    
    if (selectedAnswer === currentQuestion.answer) {
        score++;
        feedbackText.textContent = "Correct Answer!";
        feedbackText.style.color = "green";
    } else if (selectedAnswer !== "") {
        feedbackText.textContent = `Wrong Answer! The correct answer was: ${currentQuestion.answer}`;
        feedbackText.style.color = "red";
    }

    // Disable all buttons after selection
    const buttons = document.querySelectorAll('.option-button');
    buttons.forEach(button => {
        button.disabled = true;
    });

    // Show next button after a delay
    setTimeout(() => {
        document.getElementById('next-button').style.display = "inline-block";
    }, 1000); // Wait for 1 second before showing the next button
}

// Move to the next question
function nextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < quizData.length) {
        timeRemaining = 20; // Reset timer for the next question
        loadQuestion();
    } else {
        showResult();
    }
}

// Display the results
function showResult() {
    document.getElementById('quiz-container').style.display = "none";
    document.getElementById('result-container').style.display = "block";
    
    const correctAnswers = score;
    const totalQuestions = quizData.length;

    document.getElementById('score-text').textContent = `You answered ${correctAnswers} out of ${totalQuestions} questions correctly.`;
    
    // Optionally, you can also provide a message based on performance:
    if (correctAnswers === totalQuestions) {
        document.getElementById('score-text').textContent += " Excellent work!";
    } else if (correctAnswers >= totalQuestions * 0.5) {
        document.getElementById('score-text').textContent += " Great job!";
    } else {
        document.getElementById('score-text').textContent += " Keep trying!";
    }

    // Show feedback form
    document.getElementById('feedback-form').style.display = "block";
}

// Submit feedback
function submitFeedback() {
    const feedback = document.getElementById('user-feedback').value;
    alert("Thank you for your feedback: " + feedback);
    restartQuiz();
}

// Restart the quiz
function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    timeRemaining = 20;
    document.getElementById('quiz-container').style.display = "block";
    document.getElementById('result-container').style.display = "none";
    document.getElementById('feedback-form').style.display = "none";
    loadQuestion();
}

// Initialize the quiz
loadQuestion();
