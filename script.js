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
// Goal container: 300px height
// Goal frame: top 20px, height 150px (50% of 300px), centered horizontally (15% to 85%)
// Goal net: 3x2 grid inside goal frame
// Top row: 20px to 95px from top (205px to 280px from bottom)
// Bottom row: 95px to 170px from top (130px to 205px from bottom)
// Columns: left (15%-38.33%), center (38.33%-61.66%), right (61.66%-85%)
const goalPositions = {
    'top-left': { 
        goalkeeper: { bottom: '58%', left: '27%' },
        ball: { bottom: '243px', left: '27%' }  // Top-left grid cell
    },
    'top-center': { 
        goalkeeper: { bottom: '58%', left: '50%' },
        ball: { bottom: '243px', left: '50%' }  // Top-center grid cell
    },
    'top-right': { 
        goalkeeper: { bottom: '58%', left: '73%' },
        ball: { bottom: '243px', left: '73%' }  // Top-right grid cell
    },
    'bottom-left': { 
        goalkeeper: { bottom: '45%', left: '27%' },
        ball: { bottom: '168px', left: '27%' }  // Bottom-left grid cell
    },
    'bottom-center': { 
        goalkeeper: { bottom: '45%', left: '50%' },
        ball: { bottom: '168px', left: '50%' }  // Bottom-center grid cell
    },
    'bottom-right': { 
        goalkeeper: { bottom: '45%', left: '73%' },
        ball: { bottom: '168px', left: '73%' }  // Bottom-right grid cell
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
