// Quiz State
let currentQuiz = [];
let currentQuestionIndex = 0;
let userAnswers = [];
let startTime = null;
let questionStartTime = null;
let timerInterval = null;

// DOM Elements
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultsScreen = document.getElementById('results-screen');
const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const retakeBtn = document.getElementById('retake-btn');
const reviewBtn = document.getElementById('review-btn');

const progressFill = document.getElementById('progress-fill');
const questionNumber = document.getElementById('question-number');
const timerEl = document.getElementById('timer');
const difficultyBadge = document.getElementById('difficulty-badge');
const questionText = document.getElementById('question-text');
const choicesContainer = document.getElementById('choices-container');
const feedbackContainer = document.getElementById('feedback-container');
const feedbackHeader = document.getElementById('feedback-header');
const feedbackExplanation = document.getElementById('feedback-explanation');

const finalScore = document.getElementById('final-score');
const totalTime = document.getElementById('total-time');
const algorithmBreakdown = document.getElementById('algorithm-breakdown');
const weakAreasList = document.getElementById('weak-areas-list');

// Screen Management
function showScreen(screen) {
    [startScreen, quizScreen, resultsScreen].forEach(s => s.classList.remove('active'));
    screen.classList.add('active');
}

// Timer
function startTimer() {
    let seconds = 0;
    timerInterval = setInterval(() => {
        seconds++;
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        timerEl.textContent = `${mins}:${secs.toString().padStart(2, '0')}`;
    }, 1000);
}

function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Start Quiz
function startQuiz() {
    currentQuiz = generateQuiz();
    currentQuestionIndex = 0;
    userAnswers = [];
    startTime = Date.now();
    
    showScreen(quizScreen);
    startTimer();
    displayQuestion();
}

// Display Question
function displayQuestion() {
    const question = currentQuiz[currentQuestionIndex];
    questionStartTime = Date.now();
    
    // Update progress
    const progress = ((currentQuestionIndex + 1) / currentQuiz.length) * 100;
    progressFill.style.width = `${progress}%`;
    questionNumber.textContent = `Question ${currentQuestionIndex + 1} of ${currentQuiz.length}`;
    
    // Update difficulty badge
    difficultyBadge.textContent = question.difficulty;
    difficultyBadge.className = `difficulty-badge ${question.difficulty}`;
    
    // Update question text
    questionText.textContent = question.question;
    
    // Update choices
    const choiceBtns = choicesContainer.querySelectorAll('.choice-btn');
    choiceBtns.forEach((btn, index) => {
        const choiceText = btn.querySelector('.choice-text');
        choiceText.textContent = question.choices[index];
        btn.classList.remove('selected', 'correct', 'incorrect');
        btn.disabled = false;
        btn.onclick = () => selectAnswer(index);
    });
    
    // Hide feedback
    feedbackContainer.classList.remove('show');
}

// Select Answer
function selectAnswer(choiceIndex) {
    const question = currentQuiz[currentQuestionIndex];
    const choiceBtns = choicesContainer.querySelectorAll('.choice-btn');
    const selectedAnswer = question.choices[choiceIndex];
    const isCorrect = selectedAnswer === question.correct_answer;
    
    // Calculate time spent
    const timeSpent = Math.floor((Date.now() - questionStartTime) / 1000);
    
    // Store answer
    userAnswers.push({
        questionId: question.id,
        algorithm: question.algorithm,
        selectedAnswer: selectedAnswer,
        correctAnswer: question.correct_answer,
        isCorrect: isCorrect,
        timeSpent: timeSpent
    });
    
    // Disable all buttons
    choiceBtns.forEach(btn => btn.disabled = true);
    
    // Highlight correct and incorrect answers
    choiceBtns.forEach((btn, index) => {
        const btnAnswer = question.choices[index];
        if (btnAnswer === question.correct_answer) {
            btn.classList.add('correct');
        } else if (index === choiceIndex && !isCorrect) {
            btn.classList.add('incorrect');
        }
    });
    
    // Show feedback
    feedbackHeader.textContent = isCorrect ? '✓ Correct!' : '✗ Incorrect';
    feedbackHeader.className = `feedback-header ${isCorrect ? 'correct' : 'incorrect'}`;
    feedbackExplanation.textContent = question.explanation;
    feedbackContainer.classList.add('show');
}

// Next Question
function nextQuestion() {
    currentQuestionIndex++;
    
    if (currentQuestionIndex < currentQuiz.length) {
        displayQuestion();
    } else {
        showResults();
    }
}

// Show Results
function showResults() {
    stopTimer();
    showScreen(resultsScreen);
    
    // Calculate score
    const correctCount = userAnswers.filter(a => a.isCorrect).length;
    finalScore.textContent = `${correctCount}/${currentQuiz.length}`;
    
    // Calculate total time
    const totalSeconds = Math.floor((Date.now() - startTime) / 1000);
    totalTime.textContent = formatTime(totalSeconds);
    
    // Algorithm performance breakdown
    const algorithmStats = {};
    userAnswers.forEach(answer => {
        if (!algorithmStats[answer.algorithm]) {
            algorithmStats[answer.algorithm] = { correct: 0, total: 0 };
        }
        algorithmStats[answer.algorithm].total++;
        if (answer.isCorrect) {
            algorithmStats[answer.algorithm].correct++;
        }
    });
    
    // Display algorithm breakdown
    algorithmBreakdown.innerHTML = '';
    Object.entries(algorithmStats).forEach(([algorithm, stats]) => {
        const statDiv = document.createElement('div');
        statDiv.className = 'algorithm-stat';
        statDiv.innerHTML = `
            <span class="algorithm-name">${algorithm}</span>
            <span class="algorithm-score">${stats.correct}/${stats.total}</span>
        `;
        algorithmBreakdown.appendChild(statDiv);
    });
    
    // Identify weak areas (algorithms with < 50% correct)
    const weakAreas = Object.entries(algorithmStats)
        .filter(([_, stats]) => stats.correct / stats.total < 0.5)
        .map(([algorithm, _]) => algorithm);
    
    // Display weak areas
    const weakAreasContainer = document.getElementById('weak-areas');
    if (weakAreas.length > 0) {
        weakAreasContainer.style.display = 'block';
        weakAreasList.innerHTML = '';
        weakAreas.forEach(algorithm => {
            const weakDiv = document.createElement('div');
            weakDiv.className = 'weak-area-item';
            weakDiv.textContent = `Focus on: ${algorithm}`;
            weakAreasList.appendChild(weakDiv);
        });
    } else {
        weakAreasContainer.style.display = 'none';
    }
}

// Event Listeners
startBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', nextQuestion);
retakeBtn.addEventListener('click', () => {
    showScreen(startScreen);
});
reviewBtn.addEventListener('click', () => {
    // Reset to first question for review
    currentQuestionIndex = 0;
    showScreen(quizScreen);
    displayQuestion();
    
    // Pre-fill with user's answer
    const userAnswer = userAnswers[0];
    const choiceBtns = choicesContainer.querySelectorAll('.choice-btn');
    choiceBtns.forEach((btn, index) => {
        const btnAnswer = currentQuiz[0].choices[index];
        btn.disabled = true;
        if (btnAnswer === userAnswer.correctAnswer) {
            btn.classList.add('correct');
        } else if (btnAnswer === userAnswer.selectedAnswer && !userAnswer.isCorrect) {
            btn.classList.add('incorrect');
        }
    });
    
    // Show feedback
    feedbackHeader.textContent = userAnswer.isCorrect ? '✓ Correct!' : '✗ Incorrect';
    feedbackHeader.className = `feedback-header ${userAnswer.isCorrect ? 'correct' : 'incorrect'}`;
    feedbackExplanation.textContent = currentQuiz[0].explanation;
    feedbackContainer.classList.add('show');
});
