const board = document.getElementById("checkers-board");
const turnIndicator = document.getElementById("turn-indicator");
const blackCapturesEl = document.getElementById("black-captures");
const whiteCapturesEl = document.getElementById("white-captures");

let selectedPiece = null;
let currentPlayer = "black"; // Start with black's turn
let blackCaptures = 0;
let whiteCaptures = 0;

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

  // Check for valid moves (diagonal, one step or capture)
  const rowDiff = toRow - fromRow;
  const colDiff = toCol - fromCol;

  if (Math.abs(rowDiff) === 1 && Math.abs(colDiff) === 1 && !targetSquare.firstChild) {
    // Simple move
    targetSquare.appendChild(selectedPiece);
    endTurn();
  } else if (Math.abs(rowDiff) === 2 && Math.abs(colDiff) === 2) {
    // Capture move
    const midRow = fromRow + rowDiff / 2;
    const midCol = fromCol + colDiff / 2;
    const midSquare = document.querySelector(
      `.square[data-row='${midRow}'][data-col='${midCol}']`
    );
    const capturedPiece = midSquare.firstChild;

    if (
      capturedPiece &&
      !targetSquare.firstChild &&
      capturedPiece.classList.contains(currentPlayer === "black" ? "white" : "black")
    ) {
      // Remove captured piece
      midSquare.removeChild(capturedPiece);

      // Update captures
      if (currentPlayer === "black") {
        blackCaptures++;
        blackCapturesEl.textContent = blackCaptures;
      } else {
        whiteCaptures++;
        whiteCapturesEl.textContent = whiteCaptures;
      }

      targetSquare.appendChild(selectedPiece);
      endTurn();
    }
  }
}

// End the turn
function endTurn() {
  selectedPiece.classList.remove("selected");
  selectedPiece = null;
  currentPlayer = currentPlayer === "black" ? "white" : "black";
  turnIndicator.textContent = `Turn: ${currentPlayer}`;
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
  
