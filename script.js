const board = document.getElementById("checkers-board");

// Initialize the board
function createBoard() {
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const square = document.createElement("div");
      square.className = `square ${(row + col) % 2 === 0 ? "light" : "dark"}`;
      square.dataset.row = row;
      square.dataset.col = col;

      // Place pieces on the dark squares
      if ((row + col) % 2 !== 0) {
        if (row < 3) {
          // Black pieces
          const piece = document.createElement("div");
          piece.className = "piece black";
          square.appendChild(piece);
        } else if (row > 4) {
          // White pieces
          const piece = document.createElement("div");
          piece.className = "piece white";
          square.appendChild(piece);
        }
      }

      board.appendChild(square);
    }
  }
}

// Initialize the game
createBoard();
