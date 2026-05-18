initializeBoard();
createBoardUI();
renderBoard();
updateCurrentPlayer();
startTimers();
updateScores();
document.getElementById("restart-btn")
    .addEventListener("click", () => {
        location.reload();
    });
