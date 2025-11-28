// Game state
let playerScore = 0;
let goalkeeperScore = 0;
let isAnimating = false;
let shotHistory = []; // Track last 3 shots for goalkeeper AI

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

// Position mapping for goalkeeper and ball
// Game area total: goal-container (300px) + field (200px) = 500px height
// Goal container: 0-300px from bottom (200-500px from bottom of game-area)
// Goal frame: starts at 280px from bottom, height 150px, ends at 430px from bottom
// Goal net grid (3x2): 
//   - Top row centers: ~405px from bottom
//   - Bottom row centers: ~318px from bottom
//   - Left column: ~27% from left
//   - Center column: 50% from left  
//   - Right column: ~73% from left
const goalPositions = {
    'top-left': { 
        goalkeeper: { bottom: '58%', left: '27%' },
        ball: { bottom: '405px', left: '27%' }  // Top-left grid cell
    },
    'top-center': { 
        goalkeeper: { bottom: '58%', left: '50%' },
        ball: { bottom: '405px', left: '50%' }  // Top-center grid cell
    },
    'top-right': { 
        goalkeeper: { bottom: '58%', left: '73%' },
        ball: { bottom: '405px', left: '73%' }  // Top-right grid cell
    },
    'bottom-left': { 
        goalkeeper: { bottom: '45%', left: '27%' },
        ball: { bottom: '318px', left: '27%' }  // Bottom-left grid cell
    },
    'bottom-center': { 
        goalkeeper: { bottom: '45%', left: '50%' },
        ball: { bottom: '318px', left: '50%' }  // Bottom-center grid cell
    },
    'bottom-right': { 
        goalkeeper: { bottom: '45%', left: '73%' },
        ball: { bottom: '318px', left: '73%' }  // Bottom-right grid cell
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
    ball.style.bottom = '80px';  // In the field area (field is 200px, starts at bottom)
    ball.style.left = '50%';
    ball.style.transform = 'translateX(-50%)';
    ball.classList.remove('shooting', 'in-hands');
}

// Initialize shooter position
function initializeShooter() {
    shooter.style.bottom = '10%';
    shooter.classList.remove('running', 'kicking');
}

// Get random position for goalkeeper (fallback)
function getRandomPosition() {
    const positionKeys = Object.keys(goalPositions);
    const randomKey = positionKeys[Math.floor(Math.random() * positionKeys.length)];
    return randomKey;
}

// Smart goalkeeper AI with pattern detection and strategic positioning
function getSmartGoalkeeperPosition(playerTarget) {
    const random = Math.random();
    
    // 20% chance: Pattern detection - avoid recently shot positions
    if (random < 0.20 && shotHistory.length >= 2) {
        const availablePositions = Object.keys(goalPositions)
            .filter(pos => !shotHistory.includes(pos));
        if (availablePositions.length > 0) {
            return availablePositions[Math.floor(Math.random() * availablePositions.length)];
        }
    }
    
    // 30% chance: Favor center positions (easier to reach from center stance)
    if (random < 0.50) { // 20% + 30% = 50%
        const centerPositions = ['top-center', 'bottom-center'];
        return centerPositions[Math.floor(Math.random() * centerPositions.length)];
    }
    
    // 40% chance: Favor corner positions (hot zones where players often shoot)
    if (random < 0.90) { // 50% + 40% = 90%
        const cornerPositions = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];
        return cornerPositions[Math.floor(Math.random() * cornerPositions.length)];
    }
    
    // 10% chance: Completely random (unpredictable)
    return getRandomPosition();
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
    
    // Use smart goalkeeper AI instead of random
    const goalkeeperPosition = getSmartGoalkeeperPosition(target);
    const isSaved = target === goalkeeperPosition;
    
    // Track shot history for pattern detection
    shotHistory.push(target);
    if (shotHistory.length > 3) {
        shotHistory.shift(); // Keep only last 3 shots
    }
    
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
        
        // Check if game is over (first to 5 wins)
        if (playerScore === 5 || goalkeeperScore === 5) {
            setTimeout(() => {
                endGame(playerScore === 5 ? 'player' : 'goalkeeper');
            }, 1500);
            return;
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

// End game when someone reaches 5 points
function endGame(winner) {
    isAnimating = true;
    
    if (winner === 'player') {
        messageEl.textContent = '🎉 YOU WIN! You scored 5 goals!';
        messageEl.className = 'message goal';
    } else {
        messageEl.textContent = '😞 GOALKEEPER WINS! 5 saves!';
        messageEl.className = 'message saved';
    }
    
    // Keep buttons disabled - player must reset to play again
    shootButtons.forEach(btn => btn.disabled = true);
}

// Reset game
function resetGame() {
    playerScore = 0;
    goalkeeperScore = 0;
    shotHistory = []; // Clear shot history for fresh start
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
