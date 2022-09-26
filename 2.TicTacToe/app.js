// do something!
const ticTacToe = {
  O: [],
  X: [],
  currentPlayer: 'X',
  winCases: [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ],
  isEnd: false,
};

window.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.game-status').textContent = `Next Player: ${ticTacToe.currentPlayer}`;
});

document.querySelector('.game-grid').addEventListener('click', e => {
  if (!e.target.matches('.game-grid-item') || e.target.textContent || ticTacToe.isEnd) return;

  e.target.textContent = ticTacToe.currentPlayer;
  ticTacToe[ticTacToe.currentPlayer].push(+e.target.dataset.id);

  if (getResult(ticTacToe.currentPlayer) === 'WIN') {
    document.querySelector('.game-status').textContent = `Winner is ${ticTacToe.currentPlayer}`;
    ticTacToe.isEnd = true;
    return;
  }

  if (getResult(ticTacToe.currentPlayer) === 'DRAW') {
    document.querySelector('.game-status').textContent = 'Draw';
    ticTacToe.isEnd = true;
    return;
  }
  ticTacToe.currentPlayer = ticTacToe.currentPlayer === 'O' ? 'X' : 'O';

  document.querySelector('.game-status').textContent = `Next Player: ${ticTacToe.currentPlayer}`;
});

document.querySelector('.game-reset').addEventListener('click', () => window.location.reload());

const getResult = player => {
  const playerArr = ticTacToe[player];
  for (let i = 0; i < ticTacToe.winCases.length; i++) {
    if (
      playerArr.includes(ticTacToe.winCases[i][0]) &&
      playerArr.includes(ticTacToe.winCases[i][1]) &&
      playerArr.includes(ticTacToe.winCases[i][2])
    )
      return 'WIN';
  }
  return ticTacToe.O.length + ticTacToe.X.length === 9 ? 'DRAW' : 'ING';
};
