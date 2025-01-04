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

  const rowDiff = toRow - fromRow;
  const colDiff = toCol - fromCol;

  const isKing = selectedPiece.classList.contains("king");

  // Check if the move is valid
  const isValidMove =
    (isKing || (currentPlayer === "black" && rowDiff === 1) || (currentPlayer === "white" && rowDiff === -1)) &&
    Math.abs(colDiff) === 1 &&
    !targetSquare.firstChild;

  // Check for capture
  const isCaptureMove = 
    Math.abs(rowDiff) === 2 &&
    Math.abs(colDiff) === 2;

  if (isValidMove) {
    targetSquare.appendChild(selectedPiece);
    checkKingStatus(selectedPiece, toRow);
    endTurn();
  } else if (isCaptureMove) {
    const midRow = fromRow + rowDiff / 2;
    const midCol = fromCol + colDiff / 2;
    const midSquare = document.querySelector(
      `.square[data-row='${midRow}'][data-col='${midCol}']`
    );
    const capturedPiece = midSquare.firstChild;

    if (
      capturedPiece &&
      capturedPiece.classList.contains(currentPlayer === "black" ? "white" : "black") &&
      !targetSquare.firstChild
    ) {
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
      checkKingStatus(selectedPiece, toRow);
      endTurn();
    }
  }
}

// Check if a piece becomes a king
function checkKingStatus(piece, row) {
  if (currentPlayer === "black" && row === 7 && !piece.classList.contains("king")) {
    piece.classList.add("king");
    piece.textContent = "K";
  } else if (currentPlayer === "white" && row === 0 && !piece.classList.contains("king")) {
    piece.classList.add("king");
    piece.textContent = "K";
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
                                       
