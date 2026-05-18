let gameTime = 300;
let turnTime = 15;

let gameInterval;
let turnInterval;

let paused = false;

function startTimers() {

    gameInterval = setInterval(() => {

        if (paused) return;

        gameTime--;

        document.getElementById("game-timer")
            .textContent = `Game Time: ${gameTime}`;

        if (gameTime <= 0) {
            endGameByScore();
        }

    }, 1000);

    turnInterval = setInterval(() => {

        if (paused) return;

        turnTime--;

        document.getElementById("turn-timer")
            .textContent = `Turn Time: ${turnTime}`;

        if (turnTime <= 0) {
            nextTurn();
        }

    }, 1000);
}

function resetTurnTimer() {

    turnTime = 15;

    document.getElementById("turn-timer")
        .textContent = `Turn Time: ${turnTime}`;
}

function endGameByScore() {

    clearInterval(gameInterval);
    clearInterval(turnInterval);

    const winner =
        players[0].score > players[1].score
            ? players[0]
            : players[1];

    document.getElementById("winner-text")
        .textContent = `${winner.name} Wins By Score!`;

    document.getElementById("winner-popup")
        .classList.remove("hidden");
}

document.getElementById("pause-btn")
    .addEventListener("click", () => {
        paused = true;
    });

document.getElementById("resume-btn")
    .addEventListener("click", () => {
        paused = false;
    });
