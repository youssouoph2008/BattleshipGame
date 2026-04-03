// ----- CLASES -----
class Ship {
    constructor(name, length) {
        this.name = name;
        this.length = length;
        this.hits = 0;
        this.sunk = false;
    }

    hit() {
        this.hits++;
        if (this.hits >= this.length) {
            this.sunk = true;
        }
    }

    isSunk() {
        return this.sunk;
    }
}

class Gameboard {
    constructor() {
        this.board = Array(10).fill(0).map(() => Array(10).fill(0));
        this.ships = [];
        this.misses = [];
    }

    placeShip(ship, x, y, horizontal = true) {
        for (let i = 0; i < ship.length; i++) {
            if (horizontal) {
                this.board[x][y + i] = ship;
            } else {
                this.board[x + i][y] = ship;
            }
        }
        this.ships.push(ship);
    }

    receiveAttack(x, y) {
        const target = this.board[x][y];
        if (target instanceof Ship) {
            target.hit();
        } else {
            if (!this.misses.some(m => m[0] === x && m[1] === y)) {
                this.misses.push([x, y]);
            }
        }
    }

    allShipsSunk() {
        return this.ships.every(ship => ship.isSunk());
    }
}

// ----- JUGADOR -----
class Player {
    constructor(name, isComputer = false) {
        this.name = name;
        this.board = new Gameboard();
        this.isComputer = isComputer;
        this.movesMade = [];
        this.isYourTurn = false;
    }

    attack(x, y, opponentBoard) {
        if (!this.isYourTurn) return;
        opponentBoard.receiveAttack(x, y);
        this.movesMade.push([x, y]);
        this.isYourTurn = false;
    }

    randomAttack(opponentBoard) {
        if (!this.isYourTurn) return;

        let x, y;
        do {
            x = Math.floor(Math.random() * 10);
            y = Math.floor(Math.random() * 10);
        } while (this.movesMade.some(move => move[0] === x && move[1] === y));

        this.attack(x, y, opponentBoard);
    }
}

// ----- TABLEROS HTML -----
const computerDiv = document.getElementById("computer-board");
const playerDiv = document.getElementById("player-board");

function createBoard(container, isComputer = false) {
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            if (isComputer) cell.classList.add("computer-cell");
            else cell.classList.add("player-cell");
            cell.dataset.x = i;
            cell.dataset.y = j;
            container.appendChild(cell);
        }
    }
}

createBoard(computerDiv, true);
createBoard(playerDiv, false);

// ----- FUNCION DE RENDER -----
function renderBoard(board, container, showShips = false) {
    const cells = container.querySelectorAll(".cell");
    cells.forEach(cell => {
        const x = parseInt(cell.dataset.x);
        const y = parseInt(cell.dataset.y);
        const target = board.board[x][y];

        cell.style.backgroundColor = ""; // reset

        if (target instanceof Ship) {
            if (target.isSunk()) cell.style.backgroundColor = "green";
            else if (showShips) cell.style.backgroundColor = "blue";
        } else if (board.misses.some(m => m[0] === x && m[1] === y)) {
            cell.style.backgroundColor = "red";
        }
    });
}

// ----- INICIALIZAR JUGADORES -----
const player = new Player("Player");
const computer = new Player("Computer", true);

// Ejemplo: colocamos barcos manualmente
player.board.placeShip(new Ship("Destroyer", 3), 0, 0, true);
player.board.placeShip(new Ship("Submarine", 2), 2, 2, false);

computer.board.placeShip(new Ship("Destroyer", 3), 0, 0, true);
computer.board.placeShip(new Ship("Submarine", 2), 2, 2, false);

// Mostrar tablero del jugador
renderBoard(player.board, playerDiv, true);
renderBoard(computer.board, computerDiv, false);

// ----- CONTROL DE TURNOS -----
let currentPlayer = player;
player.isYourTurn = true;

computerDiv.addEventListener("click", (e) => {
    if (currentPlayer !== player) return;
    if (!e.target.classList.contains("cell")) return;

    const x = parseInt(e.target.dataset.x);
    const y = parseInt(e.target.dataset.y);

    player.attack(x, y, computer.board);
    renderBoard(player.board, playerDiv, true);
    renderBoard(computer.board, computerDiv, false);

    if (computer.board.allShipsSunk()) {
        alert("Player wins!");
        return;
    }

    currentPlayer = computer;
    computer.isYourTurn = true;
    computer.randomAttack(player.board);
    renderBoard(player.board, playerDiv, true);
    renderBoard(computer.board, computerDiv, false);

    if (player.board.allShipsSunk()) {
        alert("Computer wins!");
        return;
    }

    currentPlayer = player;
    player.isYourTurn = true;
});