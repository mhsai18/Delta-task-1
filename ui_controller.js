function createBoardUI() {

    const boardEl = document.getElementById("board");

    boardEl.innerHTML = "";

    for (let r = 0; r < ROWS; r++) {

        for (let c = 0; c < COLS; c++) {

            const cell = document.createElement("div");

            cell.classList.add("cell");
            cell.dataset.row = r;
            cell.dataset.col = c;

            cell.addEventListener("click", () => {
                makeMove(r, c);
            });

            boardEl.appendChild(cell);
        }
    }
}

function renderBoard() {

    for (let r = 0; r < ROWS; r++) {

        for (let c = 0; c < COLS; c++) {

            const cellData = board[r][c];

            const cellEl = document.querySelector(
                `[data-row='${r}'][data-col='${c}']`
            );

            cellEl.innerHTML = "";

            for (let i = 0; i < cellData.count; i++) {

                const orb = document.createElement("div");

                orb.classList.add("orb");

                if (cellData.owner === 1) {
                    orb.classList.add("red");
                }

                if (cellData.owner === 2) {
                    orb.classList.add("blue");
                }

                cellEl.appendChild(orb);
            }
        }
    }
}

function updateCurrentPlayer() {

    document.getElementById("current-player")
        .textContent =
        `Current Turn: ${players[currentPlayerIndex].name}`;
}

function updateScores() {

    document.getElementById("score1")
        .textContent = players[0].score;

    document.getElementById("score2")
        .textContent = players[1].score;
}

function addHistory(player, row, col) {

    moveHistory.push({ player, row, col });

    const li = document.createElement("li");

    li.textContent =
        `${player} placed at (${row}, ${col})`;

    document.getElementById("history")
        .appendChild(li);
}

function showWinner(playerId) {

    const player = players.find(p => p.id === playerId);

    document.getElementById("winner-text")
        .textContent = `${player.name} Wins!`;

    document.getElementById("winner-popup")
        .classList.remove("hidden");
}
