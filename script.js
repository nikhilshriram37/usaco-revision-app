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
// Goal is at top of goal-container (300px height)
// Goal frame starts at 20px from top, 50% height = 150px
// So goal net is from 20px to 170px from top of container
const goalPositions = {
    'top-left': { 
        goalkeeper: { bottom: '55%', left: '30%' },
        ball: { bottom: '240px', left: '30%' }  // Top row of goal
    },
    'top-center': { 
        goalkeeper: { bottom: '55%', left: '50%' },
        ball: { bottom: '240px', left: '50%' }
    },
    'top-right': { 
        goalkeeper: { bottom: '55%', left: '70%' },
        ball: { bottom: '240px', left: '70%' }
    },
    'bottom-left': { 
        goalkeeper: { bottom: '40%', left: '30%' },
        ball: { bottom: '200px', left: '30%' }  // Bottom row of goal
    },
    'bottom-center': { 
        goalkeeper: { bottom: '40%', left: '50%' },
        ball: { bottom: '200px', left: '50%' }
    },
    'bottom-right': { 
        goalkeeper: { bottom: '40%', left: '70%' },
        ball: { bottom: '200px', left: '70%' }
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
function shootBall(target, isSaved, goalkeeperPosition) {
    ball.classList.add('shooting');
    
    // If saved, ball goes to goalkeeper's position (caught)
    // Otherwise, ball goes to the target position (goal)
    const finalPosition = isSaved ? goalPositions[goalkeeperPosition].ball : goalPositions[target].ball;
    
    // Animate ball to final position
    ball.style.bottom = finalPosition.bottom;
    ball.style.left = finalPosition.left;
    
    // If saved, make ball smaller to show it's in goalkeeper's hands
    if (isSaved) {
        setTimeout(() => {
            ball.classList.add('in-hands');
        }, 500);
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
        shootBall(target, isSaved, goalkeeperPosition);
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
