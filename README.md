# Battleship Game 🎯

A web-based implementation of the classic Battleship game using JavaScript, Object-Oriented Programming, and Test-Driven Development (TDD). Players can place ships, take turns attacking, and play against a computer opponent with a simple, interactive interface.

## Table of Contents
Demo
Features
Installation
Usage
Technologies
Project Structure
Testing
Future Improvements



### Interactive gameplay showing player vs computer turns and ship placements.

## Features
Object-Oriented implementation using Ship, Gameboard, and Player classes.
Turn-based gameplay between player and computer.
Ships can be placed horizontally or vertically.
Automatic computer moves with random legal attacks.
Visual feedback with colors:
Blue: Player’s ship
Green: Sunk ship
Red: Missed attack
Simple DOM interface without external libraries.
Supports keyboard interaction for ship orientation (press H to toggle horizontal/vertical).
Installation
Clone the repository:
git clone https://github.com/your-username/battleship.git
Open index.html in your browser.

## No additional server or backend is required.

## Usage
Place your ships by clicking on the player board.
Press H to toggle ship orientation (horizontal/vertical).
After placing all ships, click on the computer board to attack.
Take turns with the computer until all ships of one player are sunk.
The game will alert the winner automatically.
## Technologies
JavaScript (ES6+)
HTML5 & CSS3
Jest for unit testing
DOM API for interactive boards
## Project Structure
battleship/
├─ index.html       # Main HTML file
├─ style.css        # CSS for boards and styling
├─ script.js        # Main game logic
├─ tests/
│   └─ ship.test.js
│   └─ gameboard.test.js
│   └─ player.test.js
└─ README.md        # Project documentation
## Testing

Unit tests are written using Jest:

Ship class tests:
hit() increments hits correctly.
isSunk() returns true when the ship is sunk.
Gameboard tests:
placeShip() correctly places ships on the board.
receiveAttack() registers hits and misses.
allShipsSunk() correctly identifies when all ships are sunk.
Player tests:
attack() correctly attacks opponent boards.
randomAttack() makes valid random moves.

## Run tests:

npm install
npm test
## Future Improvements
Drag-and-drop ship placement.
Two-player mode (pass-the-device or online).
Smarter computer AI that targets nearby cells after a hit.
Animations and sound effects for hits, misses, and sinking ships.
Responsive design for mobile gameplay.
