let board = Array(9).fill(null);
let currentPlayer = 'X';
let gameOver = false;

function makeMove(cell, index) {
  if (gameOver || board[index]) return;

  board[index] = currentPlayer;
  cell.textContent = currentPlayer;

  // Change background based on move
  document.body.style.backgroundImage = `url('${currentPlayer === 'X' ? 'bg_x.jpg' : 'bg_o.jpg'}')`;

  if (checkWinner()) {
    document.getElementById("status").textContent = `${currentPlayer} Wins! 🎉`;

    // Animated win background
    document.body.style.backgroundImage = `url('win.gif')`;

    gameOver = true;
  } else if (!board.includes(null)) {
    document.getElementById("status").textContent = "It's a Draw!";
    document.body.style.backgroundImage = `url('draw.jpg')`;
    gameOver = true;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    document.getElementById("status").textContent = `Turn: ${currentPlayer}`;
  }
}

function checkWinner() {
  const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];

  return winPatterns.some(([a, b, c]) => {
    return board[a] && board[a] === board[b] && board[a] === board[c];
  });
}

function resetGame() {
  board.fill(null);
  currentPlayer = 'X';
  gameOver = false;
  document.getElementById("status").textContent = "Turn: X";
  document.querySelectorAll('.cell').forEach(cell => cell.textContent = '');

  // Reset background to original
  document.body.style.backgroundImage = `url('bg.jpg')`;
}
