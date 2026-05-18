function getCapacity(row, col) {

    const isTop = row === 0;
    const isBottom = row === ROWS - 1;
    const isLeft = col === 0;
    const isRight = col === COLS - 1;

    if ((isTop || isBottom) && (isLeft || isRight)) {
        return 2;
    }

    if (isTop || isBottom || isLeft || isRight) {
        return 3;
    }

    return 4;
}

function getNeighbours(row, col) {

    const dirs = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1]
    ];

    return dirs
        .map(([dr, dc]) => [row + dr, col + dc])
        .filter(([r, c]) =>
            r >= 0 &&
            r < ROWS &&
            c >= 0 &&
            c < COLS
        );
}

function isValidMove(cell, playerId, row, col) {

    const capacity = getCapacity(row, col);

    // First move rule:
    // Player can place directly (capacity - 1) units
    // only on an empty cell.

    const currentPlayer = players[currentPlayerIndex];

    if (!currentPlayer.played) {
        return cell.owner === null;
    }

    // After first move:
    // Can only place on own cells.

    return cell.owner === playerId;
}

function makeMove(row, col) {

    const player = players[currentPlayerIndex];

    const cell = board[row][col];

    if (!isValidMove(cell, player.id, row, col)) {
        return;
    }

    // First move rule
    // Place (capacity - 1) units directly.

    if (!player.played) {

        cell.owner = player.id;
        cell.count = getCapacity(row, col) - 1;

    } else {

        cell.owner = player.id;
        cell.count += 1;
    }

    player.played = true;

    addHistory(player.name, row, col);

    // Explode on reaching capacity
    if (cell.count >= getCapacity(row, col)) {
        explode(row, col, player.id);
    }

    renderBoard();

    updateScores();

    const winner = checkWinner();

    if (winner !== null) {
        showWinner(winner);
        return;
    }

    nextTurn();
}

function explode(row, col, playerId) {

    const queue = [[row, col]];

    while (queue.length > 0) {

        const [currentRow, currentCol] = queue.shift();

        const currentCell = board[currentRow][currentCol];

        // Cell may already be processed
        if (currentCell.count < getCapacity(currentRow, currentCol)) {
            continue;
        }

        const cellElement = document.querySelector(
            `[data-row='${currentRow}'][data-col='${currentCol}']`
        );

        if (cellElement) {
            cellElement.classList.add("explode");

            setTimeout(() => {
                cellElement.classList.remove("explode");
            }, 300);
        }

        currentCell.count = 0;
        currentCell.owner = null;

        const neighbours = getNeighbours(currentRow, currentCol);

        neighbours.forEach(([r, c]) => {

            const target = board[r][c];

            // Capture scoring
            if (
                target.owner !== null &&
                target.owner !== playerId
            ) {
                players[currentPlayerIndex].score += 10;
            }

            target.owner = playerId;
            target.count += 1;

            // Chain bonus
            players[currentPlayerIndex].score += 2;

            if (target.count >= getCapacity(r, c)) {
                queue.push([r, c]);
            }
        });
    }

    renderBoard();
}

function nextTurn() {

    currentPlayerIndex =
        (currentPlayerIndex + 1) % players.length;

    updateCurrentPlayer();

    resetTurnTimer();
}

function checkWinner() {

    const alive = new Set();

    board.forEach(row => {
        row.forEach(cell => {
            if (cell.owner !== null) {
                alive.add(cell.owner);
            }
        });
    });

    // Prevent false winner detection
    // before all players get first turn.

    const activePlayers = players.filter(p => p.played);

    if (activePlayers.length < players.length) {
        return null;
    }

    if (alive.size === 1) {
        return [...alive][0];
    }

    return null;
}

function explode(row, col, playerId) {

    const cellElement = document.querySelector(
        `[data-row='${row}'][data-col='${col}']`
    );

    cellElement.classList.add("explode");

    setTimeout(() => {
        cellElement.classList.remove("explode");
    }, 300);

    board[row][col].count = 0;
    board[row][col].owner = null;

    const neighbours = getNeighbours(row, col);

    neighbours.forEach(([r, c]) => {

        const target = board[r][c];

        if (
            target.owner !== null &&
            target.owner !== playerId
        ) {
            players[currentPlayerIndex].score += 10;
        }

        target.owner = playerId;
        target.count += 1;

        if (target.count >= getCapacity(r, c)) {
            explode(r, c, playerId);
        }
    });
}

function nextTurn() {

    currentPlayerIndex =
        (currentPlayerIndex + 1) % players.length;

    updateCurrentPlayer();

    resetTurnTimer();
}

function checkWinner() {

    const alive = new Set();

    board.forEach(row => {
        row.forEach(cell => {
            if (cell.owner !== null) {
                alive.add(cell.owner);
            }
        });
    });

    const activePlayers = players.filter(p => p.played);

    if (
        activePlayers.length === players.length &&
        alive.size === 1
    ) {
        return [...alive][0];
    }

    return null;
}
