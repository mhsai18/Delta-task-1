const ROWS = 6;
const COLS = 12;

const players = [
    {
        id: 1,
        name: "Player 1",
        color: "red",
        score: 0,
        played: false
    },
    {
        id: 2,
        name: "Player 2",
        color: "blue",
        score: 0,
        played: false
    }
];

let currentPlayerIndex = 0;

let board = [];

let moveHistory = [];

function initializeBoard() {

    board = Array.from({ length: ROWS }, () =>
        Array.from({ length: COLS }, () => ({
            owner: null,
            count: 0
        }))
    );
}
