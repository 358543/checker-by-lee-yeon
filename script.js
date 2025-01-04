const board = document.getElementById("checkers-board");

// Paths to the piece images
const whitePieceImg = "white-piece.png"; // Update to your file location
const blackPieceImg = "black-piece.png"; // Update to your file location

// Initialize the board
function createBoard() {
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const square = document.createElement("div");
      square.className = `square ${(row + col) % 2 === 0 ? "light" : "dark"}`;
      square.dataset.row = row;
      square.dataset.col = col;

      // Add pieces for initial setup
      if ((row + col) % 2 !== 0 && (row < 3 || row > 4)) {
        const piece = document.createElement("img");
        piece.src = row < 3 ? blackPieceImg : whitePieceImg;
        piece.alt = row < 3 ? "Black Piece" : "White Piece";
        piece.className = "piece";
        square.appendChild(piece);
      }

      board.appendChild(square);
    }
  }
}

// Add event listeners to pieces (future moves logic)
function addPieceListeners() {
  const pieces = document.querySelectorAll(".piece");
  pieces.forEach(piece => {
    piece.addEventListener("click", () => {
      console.log("Piece clicked!");
      // Add logic for piece movement here
    });
  });
}

// Create the board and initialize the game
createBoard();
addPieceListeners();
                                    
