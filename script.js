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
const shooter = document.getElementById('shooter');
const goalSections = document.querySelectorAll('.goal-section');
const goalContainer = document.querySelector('.goal-container');

// Position mapping for goalkeeper and ball in goal area
const goalPositions = {
    'top-left': { 
        goalkeeper: { bottom: '45%', left: '25%' },
        ball: { bottom: '220px', left: '25%' }
    },
    'top-center': { 
        goalkeeper: { bottom: '45%', left: '50%' },
        ball: { bottom: '220px', left: '50%' }
    },
    'top-right': { 
        goalkeeper: { bottom: '45%', left: '75%' },
        ball: { bottom: '220px', left: '75%' }
    },
    'bottom-left': { 
        goalkeeper: { bottom: '25%', left: '25%' },
        ball: { bottom: '140px', left: '25%' }
    },
    'bottom-center': { 
        goalkeeper: { bottom: '25%', left: '50%' },
        ball: { bottom: '140px', left: '50%' }
    },
    'bottom-right': { 
        goalkeeper: { bottom: '25%', left: '75%' },
        ball: { bottom: '140px', left: '75%' }
    }
};

// Initialize goalkeeper position
function initializeGoalkeeper() {
    goalkeeper.style.bottom = '20%';
    goalkeeper.style.left = '50%';
    goalkeeper.style.transform = 'translateX(-50%)';
    goalkeeper.classList.remove('diving');
}

// Initialize ball position
function initializeBall() {
    ball.style.bottom = '40%';
    ball.style.left = '50%';
    ball.style.transform = 'translateX(-50%)';
    ball.classList.remove('shooting', 'in-hands');
}

// Initialize shooter position
function initializeShooter() {
    shooter.style.bottom = '10%';
    shooter.classList.remove('running', 'kicking');
}

// Get random position for goalkeeper
function getRandomPosition() {
    const positionKeys = Object.keys(goalPositions);
    const randomKey = positionKeys[Math.floor(Math.random() * positionKeys.length)];
    return randomKey;
}

// Move goalkeeper to dive position
function moveGoalkeeper(position) {
    const pos = goalPositions[position].goalkeeper;
    goalkeeper.classList.add('diving');
    goalkeeper.style.bottom = pos.bottom;
    goalkeeper.style.left = pos.left;
    goalkeeper.style.transform = 'translateX(-50%)';
}

// Shoot ball to position
function shootBall(target, isSaved) {
    const pos = goalPositions[target].ball;
    ball.classList.add('shooting');
    
    // Animate ball to target position
    ball.style.bottom = pos.bottom;
    ball.style.left = pos.left;
    
    // If saved, ball ends up in goalkeeper's hands
    if (isSaved) {
        setTimeout(() => {
            ball.classList.add('in-hands');
        }, 400);
    }
}

// Animate shooter run-up and kick
function animateShooterKick() {
    // Run up
    shooter.classList.add('running');
    
    // Kick after run-up
    setTimeout(() => {
        shooter.classList.remove('running');
        shooter.classList.add('kicking');
    }, 600);
}

// Handle shoot action
function handleShoot(event) {
    if (isAnimating) return;
    
    isAnimating = true;
    const target = event.target.dataset.target;
    const goalkeeperPosition = getRandomPosition();
    const isSaved = target === goalkeeperPosition;
    
    // Disable all buttons
    shootButtons.forEach(btn => btn.disabled = true);
    
    // Clear previous highlights
    goalSections.forEach(section => {
        section.classList.remove('goal', 'saved');
    });
    
    // Start shooter animation
    animateShooterKick();
    
    // After shooter runs up and kicks (600ms), move ball and goalkeeper
    setTimeout(() => {
        moveGoalkeeper(goalkeeperPosition);
        shootBall(target, isSaved);
    }, 600);
    
    // Check result after all animations complete
    setTimeout(() => {
        const targetSection = document.querySelector(`.goal-section[data-position="${target}"]`);
        
        if (isSaved) {
            // Goalkeeper saved
            goalkeeperScore++;
            goalkeeperScoreEl.textContent = goalkeeperScore;
            messageEl.textContent = '🧤 SAVED! The goalkeeper caught the ball!';
            messageEl.className = 'message saved';
            if (targetSection) targetSection.classList.add('saved');
        } else {
            // Goal scored
            playerScore++;
            playerScoreEl.textContent = playerScore;
            messageEl.textContent = '⚽ GOAL! You scored!';
            messageEl.className = 'message goal';
            if (targetSection) targetSection.classList.add('goal');
        }
        
        // Reset after showing result
        setTimeout(() => {
            initializeGoalkeeper();
            initializeBall();
            initializeShooter();
            shootButtons.forEach(btn => btn.disabled = false);
            isAnimating = false;
            
            // Clear highlight
            setTimeout(() => {
                if (targetSection) {
                    targetSection.classList.remove('goal', 'saved');
                }
            }, 500);
        }, 2000);
    }, 1300);
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
    initializeShooter();
    
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
initializeShooter();
