document.addEventListener('DOMContentLoaded', () => {
    const scooby = document.getElementById('scooby');
    const obstacle = document.getElementById('obstacle');
    const scoreDisplay = document.getElementById('score');
    
    let isJumping = false;
    let score = 0;
    let obstacleSpeed = getRandomObstacleSpeed(); // Initialize obstacle speed
    let jumpHeight = 150; // Height of the jump
    let jumpDuration = 700; // Total jump duration (ms)
    let jumpPeak = jumpDuration / 2; // Peak of the jump, half of the total duration

    // Function to get a random speed between 8 and 15
    function getRandomObstacleSpeed() {
        return Math.random() * (15 - 8) + 8; // Generates a number between 8 and 15
    }

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space' && !isJumping) {
            jump();
        }
    });

    function jump() {
        isJumping = true;
        scooby.style.transition = `bottom ${jumpPeak}ms ease-in-out`;
        scooby.style.bottom = `${jumpHeight}px`;

        // After reaching the peak, start falling
        setTimeout(() => {
            scooby.style.transition = `bottom ${jumpPeak}ms ease-in-out`;
            scooby.style.bottom = '10px'; // Reset to the ground position
            setTimeout(() => {
                isJumping = false;
                scooby.style.transition = 'none'; // Disable transition for other movements
            }, jumpPeak); // Time for falling back
        }, jumpPeak); // Time to reach the peak
    }

    function moveObstacle() {
        const obstaclePos = obstacle.getBoundingClientRect();
        const scoobyPos = scooby.getBoundingClientRect();

        // Check for collision
        if (obstaclePos.left < scoobyPos.right &&
            obstaclePos.right > scoobyPos.left &&
            obstaclePos.bottom > scoobyPos.top &&
            obstaclePos.top < scoobyPos.bottom) {
            alert('Game Over! Score: ' + score);
            document.location.reload();
        }

        // Move the obstacle
        if (obstaclePos.left < -60) {
            obstacle.style.right = '-60px';
            score += 10;
            scoreDisplay.textContent = 'Score: ' + score;
            obstacleSpeed = getRandomObstacleSpeed(); // Set new random speed for the next obstacle
        } else {
            obstacle.style.right = (parseFloat(getComputedStyle(obstacle).right) + obstacleSpeed) + 'px';
        }
    }

    function gameLoop() {
        moveObstacle();
        requestAnimationFrame(gameLoop);
    }

    gameLoop();
});
