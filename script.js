// Game state
let playerScore = 0;
let goalkeeperScore = 0;
let isAnimating = false;

// DOM elements
const playerScoreEl = document.getElementById('player-score');
const goalkeeperScoreEl = document.getElementById('goalkeeper-score');
const messageEl = document.getElementById('message');
const shootButtons = document.querySelectorAll('.shoot-btn');
const resetBtn = document.getElementById('reset-btn');
const goalkeeper = document.getElementById('goalkeeper');
const ball = document.getElementById('ball');
const goalSections = document.querySelectorAll('.goal-section');

// Position mapping for goalkeeper and ball
const positions = {
    'top-left': { top: '15%', left: '16.5%' },
    'top-center': { top: '15%', left: '50%' },
    'top-right': { top: '15%', left: '83.5%' },
    'bottom-left': { top: '65%', left: '16.5%' },
    'bottom-center': { top: '65%', left: '50%' },
    'bottom-right': { top: '65%', left: '83.5%' }
};

// Initialize goalkeeper position
function initializeGoalkeeper() {
    goalkeeper.style.top = '50%';
    goalkeeper.style.left = '50%';
    goalkeeper.style.transform = 'translate(-50%, -50%)';
}

// Initialize ball position
function initializeBall() {
    ball.style.left = '50%';
    ball.style.bottom = '-50px';
    ball.style.transform = 'translateX(-50%)';
    ball.classList.remove('shooting');
}

// Get random position for goalkeeper
function getRandomPosition() {
    const positionKeys = Object.keys(positions);
    const randomKey = positionKeys[Math.floor(Math.random() * positionKeys.length)];
    return randomKey;
}

// Move goalkeeper to position
function moveGoalkeeper(position) {
    const pos = positions[position];
    goalkeeper.style.top = pos.top;
    goalkeeper.style.left = pos.left;
    goalkeeper.style.transform = 'translate(-50%, -50%)';
}

// Shoot ball to position
function shootBall(target) {
    const pos = positions[target];
    ball.classList.add('shooting');
    
    // Convert bottom position to top for animation
    const goalHeight = document.querySelector('.goal').offsetHeight;
    let topPosition;
    
    if (target.startsWith('top-')) {
        topPosition = '15%';
    } else {
        topPosition = '65%';
    }
    
    ball.style.top = topPosition;
    ball.style.left = pos.left;
    ball.style.bottom = 'auto';
}

// Handle shoot action
function handleShoot(event) {
    if (isAnimating) return;
    
    isAnimating = true;
    const target = event.target.dataset.target;
    const goalkeeperPosition = getRandomPosition();
    
    // Disable all buttons
    shootButtons.forEach(btn => btn.disabled = true);
    
    // Clear previous highlights
    goalSections.forEach(section => {
        section.classList.remove('goal', 'saved');
    });
    
    // Move goalkeeper and shoot ball
    moveGoalkeeper(goalkeeperPosition);
    shootBall(target);
    
    // Check result after animation
    setTimeout(() => {
        const targetSection = document.querySelector(`[data-position="${target}"]`);
        
        if (target === goalkeeperPosition) {
            // Goalkeeper saved
            goalkeeperScore++;
            goalkeeperScoreEl.textContent = goalkeeperScore;
            messageEl.textContent = '🧤 Saved! The goalkeeper blocked your shot!';
            messageEl.className = 'message saved';
            targetSection.classList.add('saved');
        } else {
            // Goal scored
            playerScore++;
            playerScoreEl.textContent = playerScore;
            messageEl.textContent = '⚽ GOAL! You scored!';
            messageEl.className = 'message goal';
            targetSection.classList.add('goal');
        }
        
        // Reset after showing result
        setTimeout(() => {
            initializeGoalkeeper();
            initializeBall();
            shootButtons.forEach(btn => btn.disabled = false);
            isAnimating = false;
            
            // Clear highlight after a bit
            setTimeout(() => {
                targetSection.classList.remove('goal', 'saved');
            }, 500);
        }, 1500);
    }, 500);
}

// Reset game
function resetGame() {
    playerScore = 0;
    goalkeeperScore = 0;
    playerScoreEl.textContent = '0';
    goalkeeperScoreEl.textContent = '0';
    messageEl.textContent = '';
    messageEl.className = 'message';
    
    goalSections.forEach(section => {
        section.classList.remove('goal', 'saved');
    });
    
    initializeGoalkeeper();
    initializeBall();
    
    shootButtons.forEach(btn => btn.disabled = false);
    isAnimating = false;
}

// Event listeners
shootButtons.forEach(btn => {
    btn.addEventListener('click', handleShoot);
});

resetBtn.addEventListener('click', resetGame);

// Initialize game
initializeGoalkeeper();
initializeBall();
