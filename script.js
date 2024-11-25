const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Canvas size
canvas.width = 400;
canvas.height = 400;

// Game variables
const tileSize = 20;
let snake = [{ x: 200, y: 200 }];
let food = { x: randomCoord(), y: randomCoord() };
let direction = { x: 0, y: 0 };
let score = 0;

// Control the game
document.addEventListener("keydown", changeDirection);
setInterval(updateGame, 100);

// Random coordinate generator
function randomCoord() {
  return Math.floor((Math.random() * canvas.width) / tileSize) * tileSize;
}

// Update game state
function updateGame() {
  // Update snake position
  const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

  // Check collision
  if (head.x < 0 || head.y < 0 || head.x >= canvas.width || head.y >= canvas.height || isColliding(head)) {
    alert(`Game Over! Your Score: ${score}`);
    snake = [{ x: 200, y: 200 }];
    direction = { x: 0, y: 0 };
    score = 0;
    food = { x: randomCoord(), y: randomCoord() };
    return;
  }

  snake.unshift(head);
  if (head.x === food.x && head.y === food.y) {
    score++;
    food = { x: randomCoord(), y: randomCoord() };
  } else {
    snake.pop();
  }

  // Draw everything
  drawGame();
}

// Check self-collision
function isColliding(part) {
  return snake.some(segment => segment.x === part.x && segment.y === part.y);
}

// Draw game elements
function drawGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw food
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, tileSize, tileSize);

  // Draw snake
  ctx.fillStyle = "green";
  snake.forEach(segment => ctx.fillRect(segment.x, segment.y, tileSize, tileSize));

  // Draw score
  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.fillText(`Score: ${score}`, 10, 20);
}

// Change snake direction
function changeDirection(event) {
  const key = event.keyCode;
  if (key === 37 && direction.x === 0) direction = { x: -tileSize, y: 0 }; // Left
  else if (key === 38 && direction.y === 0) direction = { x: 0, y: -tileSize }; // Up
  else if (key === 39 && direction.x === 0) direction = { x: tileSize, y: 0 }; // Right
  else if (key === 40 && direction.y === 0) direction = { x: 0, y: tileSize }; // Down
}
