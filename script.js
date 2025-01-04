const board = document.getElementById("checkers-board");
const turnIndicator = document.getElementById("turn-indicator");

let selectedPiece = null;
let currentPlayer = "black"; // Start with black's turn

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
          const piece = createPiece("black");
          square.appendChild(piece);
        } else if (row > 4) {
          const piece = createPiece("white");
          square.appendChild(piece);
        }
      }

      board.appendChild(square);
    }
  }
}

// Create a piece
function createPiece(color) {
  const piece = document.createElement("div");
  piece.className = `piece ${color}`;
  piece.draggable = true;

  // Add click event listener to pieces
  piece.addEventListener("click", () => selectPiece(piece));
  return piece;
}

// Select a piece
function selectPiece(piece) {
  if (piece.classList.contains(currentPlayer)) {
    if (selectedPiece) {
      selectedPiece.classList.remove("selected");
    }
    selectedPiece = piece;
    piece.classList.add("selected");
  }
}

// Move a piece
function movePiece(targetSquare) {
  if (!selectedPiece) return;

  const fromSquare = selectedPiece.parentElement;
  const fromRow = parseInt(fromSquare.dataset.row);
  const fromCol = parseInt(fromSquare.dataset.col);
  const toRow = parseInt(targetSquare.dataset.row);
  const toCol = parseInt(targetSquare.dataset.col);

  // Check if the move is valid (simple diagonal move for now)
  if (Math.abs(toRow - fromRow) === 1 && Math.abs(toCol - fromCol) === 1) {
    targetSquare.appendChild(selectedPiece);
    selectedPiece.classList.remove("selected");
    selectedPiece = null;

    // Switch turn
    currentPlayer = currentPlayer === "black" ? "white" : "black";
    turnIndicator.textContent = `Turn: ${currentPlayer}`;
  }
}

// Add event listeners to dark squares
function addSquareListeners() {
  const squares = document.querySelectorAll(".square.dark");
  squares.forEach(square => {
    square.addEventListener("click", () => movePiece(square));
  });
}

// Initialize the game
createBoard();
addSquareListeners();
