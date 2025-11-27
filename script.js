// Game state
let playerScore = 0;
let goalkeeperScore = 0;
let isAnimating = false;
let currentPower = 0;
let powerBarAnimating = false;
let powerBarDirection = 1; // 1 for increasing, -1 for decreasing

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
const powerBarFill = document.getElementById('power-bar-fill');
const powerValueEl = document.getElementById('power-value');

// Constants
const GOALKEEPER_BASE_SPEED = 0.5; // seconds to reach a position
const POWER_BAR_SPEED = 2; // Speed of power bar animation (lower = faster)

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
    ball.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)'; // Reset to default
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

// Start power bar animation
function startPowerBar() {
    powerBarAnimating = true;
    powerBarFill.classList.add('animating');
    animatePowerBar();
}

// Stop power bar and return current power (0-100)
function stopPowerBar() {
    powerBarAnimating = false;
    powerBarFill.classList.remove('animating');
    
    // Get current width percentage
    const computedStyle = window.getComputedStyle(powerBarFill);
    const width = parseFloat(computedStyle.width);
    const trackWidth = parseFloat(window.getComputedStyle(powerBarFill.parentElement).width);
    currentPower = (width / trackWidth) * 100;
    
    // Update display
    let powerText = '';
    if (currentPower < 33) {
        powerText = `Weak (${Math.round(currentPower)}%)`;
    } else if (currentPower < 66) {
        powerText = `Medium (${Math.round(currentPower)}%)`;
    } else {
        powerText = `Strong (${Math.round(currentPower)}%)`;
    }
    powerValueEl.textContent = powerText;
    
    return currentPower;
}

// Animate power bar manually (smoother than CSS animation for stopping)
let powerBarInterval;
function animatePowerBar() {
    let power = 0;
    let direction = 1;
    
    powerBarInterval = setInterval(() => {
        if (!powerBarAnimating) {
            clearInterval(powerBarInterval);
            return;
        }
        
        power += direction * 2;
        
        if (power >= 100) {
            power = 100;
            direction = -1;
        } else if (power <= 0) {
            power = 0;
            direction = 1;
        }
        
        powerBarFill.style.width = power + '%';
    }, 20);
}

// Calculate distance between two positions (as percentage)
function calculateDistance(pos1Left, pos2Left) {
    // Convert percentage strings to numbers
    const left1 = parseFloat(pos1Left);
    const left2 = parseFloat(pos2Left);
    return Math.abs(left1 - left2);
}

// Determine if goalkeeper can save based on power and distance
function canGoalkeeperSave(shotPower, targetPosition, goalkeeperPosition) {
    // Shot speed based on power (higher power = faster shot = less time for keeper)
    // Weak shots: 0.8s, Medium: 0.6s, Strong: 0.4s
    const shotSpeed = 0.8 - (shotPower / 100) * 0.4;
    
    // Goalkeeper's fixed dive speed (0.4s from CSS)
    const keeperDiveSpeed = 0.4;
    
    if (targetPosition === goalkeeperPosition) {
        // Goalkeeper guessed correctly - they'll be there in time
        return true;
    }
    
    // Goalkeeper guessed wrong - can they redirect?
    // Step 1: Calculate time to reach their initial (wrong) position
    const initialDistance = calculateDistance('50%', goalPositions[goalkeeperPosition].goalkeeper.left);
    const timeToWrongSpot = GOALKEEPER_BASE_SPEED * (initialDistance / 23);
    
    // Step 2: Calculate time remaining after reaching wrong spot
    const timeRemaining = shotSpeed - timeToWrongSpot;
    
    // Step 3: If no time remaining, ball already entered goal
    if (timeRemaining <= 0) {
        return false; // Ball entered goal before keeper reached wrong spot
    }
    
    // Step 4: Calculate distance from wrong spot to actual target
    const redirectDistance = calculateDistance(
        goalPositions[goalkeeperPosition].goalkeeper.left,
        goalPositions[targetPosition].goalkeeper.left
    );
    
    // Step 5: Calculate time needed to redirect to correct position
    const timeToRedirect = GOALKEEPER_BASE_SPEED * (redirectDistance / 23);
    
    // Step 6: Goalkeeper can save if they can redirect in time
    return timeToRedirect <= timeRemaining;
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
function shootBall(target, isSaved, goalkeeperPosition, shotPower) {
    ball.classList.add('shooting');
    
    // Calculate ball speed based on power
    // Weak shots: 0.8s, Medium: 0.6s, Strong: 0.4s
    const ballSpeed = 0.8 - (shotPower / 100) * 0.4;
    
    // Apply transition duration based on power
    ball.style.transition = `all ${ballSpeed}s cubic-bezier(0.33, 0.01, 0.12, 1.01)`;
    
    // Ball always goes to the target position (where player shot)
    // If saved, goalkeeper will be there to catch it (either guessed right or redirected)
    const finalPosition = goalPositions[target].ball;
    
    // Animate ball to final position
    ball.style.bottom = finalPosition.bottom;
    ball.style.left = finalPosition.left;
    
    // If saved, make ball smaller to show it's in goalkeeper's hands
    if (isSaved) {
        setTimeout(() => {
            ball.classList.add('in-hands');
        }, ballSpeed * 1000 * 0.8); // Slightly before ball arrives
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
    
    const target = event.target.dataset.target;
    
    // First click: start power bar
    if (!powerBarAnimating) {
        startPowerBar();
        powerValueEl.textContent = 'Click again to shoot!';
        return;
    }
    
    // Second click: stop power bar and shoot
    const shotPower = stopPowerBar();
    isAnimating = true;
    
    const goalkeeperPosition = getRandomPosition();
    
    // Determine if it's a save based on power and distance
    let isSaved = false;
    if (target === goalkeeperPosition) {
        // Goalkeeper guessed right - can they reach it in time?
        isSaved = canGoalkeeperSave(shotPower, target, goalkeeperPosition);
    } else {
        // Goalkeeper guessed wrong - can they still reach it?
        isSaved = canGoalkeeperSave(shotPower, target, goalkeeperPosition);
    }
    
    // Disable all buttons
    shootButtons.forEach(btn => btn.disabled = true);
    
    // Clear previous highlights
    goalSections.forEach(section => {
        section.classList.remove('goal', 'saved');
    });
    
    // Start shooter animation
    animateShooterKick();
    
    // Calculate ball speed for timing
    const ballSpeed = 0.8 - (shotPower / 100) * 0.4;
    
    // After shooter runs up and kicks (600ms), move ball and goalkeeper
    setTimeout(() => {
        // Goalkeeper dives to their chosen position
        moveGoalkeeper(goalkeeperPosition);
        shootBall(target, isSaved, goalkeeperPosition, shotPower);
        
        // If saved and goalkeeper guessed wrong, show redirection
        if (isSaved && target !== goalkeeperPosition) {
            const initialDistance = calculateDistance('50%', goalPositions[goalkeeperPosition].goalkeeper.left);
            const timeToWrongSpot = (GOALKEEPER_BASE_SPEED * (initialDistance / 23)) * 1000;
            
            // After reaching wrong spot, redirect to correct position
            setTimeout(() => {
                moveGoalkeeper(target);
            }, timeToWrongSpot);
        }
    }, 600);
    
    // Check result after all animations complete (600ms kick + ball travel time)
    const resultDelay = 600 + (ballSpeed * 1000);
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
        if (playerScore >= 5) {
            messageEl.textContent = '🎉 YOU WIN! You scored 5 goals!';
            messageEl.className = 'message goal';
            shootButtons.forEach(btn => btn.disabled = true);
            isAnimating = false;
            return;
        } else if (goalkeeperScore >= 5) {
            messageEl.textContent = '😢 GAME OVER! Goalkeeper saved 5 shots!';
            messageEl.className = 'message saved';
            shootButtons.forEach(btn => btn.disabled = true);
            isAnimating = false;
            return;
        }
        
        // Reset after showing result
        setTimeout(() => {
            initializeGoalkeeper();
            initializeBall();
            initializeShooter();
            powerValueEl.textContent = 'Click to shoot!';
            powerBarFill.style.width = '0%';
            shootButtons.forEach(btn => btn.disabled = false);
            isAnimating = false;
            
            // Clear highlight
            setTimeout(() => {
                if (targetSection) {
                    targetSection.classList.remove('goal', 'saved');
                }
            }, 500);
        }, 2000);
    }, resultDelay);
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
    
    // Reset power bar
    powerBarAnimating = false;
    if (powerBarInterval) clearInterval(powerBarInterval);
    powerBarFill.classList.remove('animating');
    powerBarFill.style.width = '0%';
    powerValueEl.textContent = 'Click to shoot!';
    currentPower = 0;
    
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
