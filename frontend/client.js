/*//
 -Author: Kristopher Werlinder, 2020.
//*/

/* [DEVELOPMENT]: LOCAL */
const socket = io("http://localhost:3000");

/* [PUBLIC]: ONLINE (socket, listens for messages from the server) */
/* const socket = io("https://warm-harbor-48465.herokuapp.com/"); */

/* [MESSAGES FROM SERVER]: Client handles incoming messages. */
socket.on("init", handleInit);
socket.on("gameState", handleGameState);
socket.on("gameOver", handleGameOver);
socket.on("gameCode", handleGameCode);
socket.on("unknownCode", handleUnknownCode);
socket.on("tooManyPlayers", handleTooManyPlayers);

/* ## Frontend Elements ## */
const gameScreen = document.getElementById("gameScreen");
const initialScreen = document.getElementById("initialScreen");
const newGameButton = document.getElementById("newGameButton");
const joinGameButton = document.getElementById("joinGameButton");
const gameCodeInput = document.getElementById("gameCodeInput");
const gameCodeDisplay = document.getElementById("gameCodeDisplay");

const postGameCard = document.querySelector(".postGame");
const postGameCardText = document.querySelector(".postGame .text");
const postGameCountdown = document.querySelector(".postGame .countdown");

let scoreboard = document.querySelector(".scores");

/* ## Event Listeners ## */
newGameButton.addEventListener("click", newGame);
joinGameButton.addEventListener("click", joinGame);

/* # Game Variables # */
const BG_COLOR = "#231f20";
const PLAYER_1_COLOR = "green"; //c2c2c2
const PLAYER_2_COLOR = "red";
const FLASH_COLOR = "white";
const FOOD_COLOR = "#e66916";
let canvas, contex;
let playerNumber;
let gameActive = false;
let flash = 0;

/* ## NewGame: Tell server that a game is initialized ## */
function newGame() {
  socket.emit("newGame");
  initializeGameWindow();
}

/* ## JoinGame: Give server the code to connect players ## */
function joinGame() {
  let code = gameCodeInput.value;
  if (code != null) if (code.charAt(0) == " ") code = code.slice(1, code.length);
  socket.emit("joinGame", code);
  initializeGameWindow();
}

/* ## InitializeGameWindow: Display a game window to the user ## */
function initializeGameWindow() {
  initialScreen.style.display = "none";
  document.getElementById("card").style.display = "none";
  gameScreen.style.display = "block";
  //
  canvas = document.getElementById("canvas");
  contex = canvas.getContext("2d");
  canvas.width = canvas.height = 850;
  contex.fillStyle = BG_COLOR;
  contex.fillRect(0, 0, canvas.width, canvas.height);
  //
  document.addEventListener("keydown", keydown);
  gameActive = true;
}

/* ## Keydown: Tell server what keys are pressed by the user ## */
function keydown(e) {
  socket.emit("keydown", e.keyCode);
}

/* ## PaintGame: Draw game window ## */
function paintGame(state) {
  contex.fillStyle = BG_COLOR;
  contex.fillRect(0, 0, canvas.width, canvas.height);

  const food = state.food;
  const gridsize = state.gridsize;
  const size = canvas.width / gridsize;

  contex.fillStyle = FOOD_COLOR;
  contex.fillRect(food.x * size, food.y * size, size, size);

  paintPlayer(state.players[0], size, PLAYER_1_COLOR);
  if (playerNumber == 1 && flash < 2) {
    setTimeout(() => {
      paintPlayer(state.players[0], size, FLASH_COLOR);
    }, 150);
    flash++;
  }
  paintPlayer(state.players[1], size, PLAYER_2_COLOR);
  if (playerNumber == 2 && flash < 2) {
    setTimeout(() => {
      paintPlayer(state.players[1], size, FLASH_COLOR);
    }, 150);
    flash++;
  }
}

/* ## PaintPlayer: ## */
function paintPlayer(playerState, size, color) {
  const snake = playerState.snake;
  contex.fillStyle = color;

  for (let cell of snake) {
    contex.fillRect(cell.x * size, cell.y * size, size, size);
  }
}

/* ## HandleInit: ## */
function handleInit(number) {
  playerNumber = number;
}

/* ## HandleGameState: ## */
function handleGameState(gameState) {
  if (!gameActive) {
    return;
  }
  gameState = JSON.parse(gameState);
  scoreboard.querySelector(".P1-snake").innerText = "(" + gameState.players[0].foodCollected + "/15)";
  scoreboard.querySelector(".P2-snake").innerText = "(" + gameState.players[1].foodCollected + "/15)";
  requestAnimationFrame(() => paintGame(gameState));
}

/* ## HandleGameOver: ## */
function handleGameOver(data) {
  if (!gameActive) {
    return;
  }
  data = JSON.parse(data);

  if (Math.max(data.score.P1, data.score.P2) >= 3) {
    gameActive = false; // Close the game
    // console.log("Close game");
  }

  scoreboard.querySelector(".P1").innerText = "P1: " + data.score.P1;
  scoreboard.querySelector(".P2").innerText = "P2: " + data.score.P2;
  if (data.score.P1 == 3) {
    scoreboard.querySelector(".P1").style.color = "green";
  }
  if (data.score.P2 == 3) {
    scoreboard.querySelector(".P2").style.color = "green";
  }

  postGameCard.style.display = "block";
  if (data.winner === -1) {
    postGameCardText.innerText = "You Tied :O";
  } else if (data.winner === playerNumber) {
    postGameCardText.innerText = "You Win ;)";
  } else {
    postGameCardText.innerText = "You Lose :(";
  }
  startCountdown();
  playerNumber = null;
}

/* ## HandleGameCode: ## */
function handleGameCode(gameCode) {
  gameCodeDisplay.innerText = gameCode;
}

/* ## HandleUnknownCode: ## */
function handleUnknownCode() {
  reset();
  alert("Unknown Game Code");
}

/* ## HandleTooManyPlayers: ## */
function handleTooManyPlayers() {
  reset();
  alert("This game is already in progress");
}

/* ## Reset: ## */
function reset() {
  playerNumber = null;
  gameCodeInput.value = "";
  initialScreen.style.display = "block";
  gameScreen.style.display = "none";
}

function startCountdown() {
  let counter = 6;
  let countdownTimer = setInterval(() => {
    counter--;
    postGameCountdown.innerText = counter;
    if (counter == -1) {
      clearInterval(countdownTimer);
      postGameCard.style.display = "none";
      postGameCardText.innerText = "";
      postGameCountdown.innerText = "";
    }
  }, 1000);
}
