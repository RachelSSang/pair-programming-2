// do something!
(function ticTacToe() {
  const WIN_CASES = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const state = {
    board: Array(9).fill(null),
    currentPlayer: 'X',
    isOver: false,
  };

  const $gameStatus = document.querySelector('.game-status');

  // board에 따라 승자, DRQ
  const getResult = () => {
    const { board } = state;
    for (const [x, y, z] of WIN_CASES) {
      if (board[x] && board[x] === board[y] && board[y] === board[z]) return board[x];
    }
    return board.filter(cell => cell).length === 9 ? 'DRAW' : 'ING';
  };

  window.addEventListener('DOMContentLoaded', () => {
    $gameStatus.textContent = `Next Player: ${state.currentPlayer}`;
  });

  document.querySelector('.game-grid').addEventListener('click', e => {
    if (!e.target.matches('.game-grid-item') || e.target.textContent || state.isOver) return;

    e.target.textContent = state.currentPlayer;
    state.board[+e.target.dataset.id] = state.currentPlayer;

    if (getResult(state.currentPlayer) === 'ING') {
      state.currentPlayer = state.currentPlayer === 'O' ? 'X' : 'O';
      $gameStatus.textContent = `Next Player: ${state.currentPlayer}`;
      return;
    }

    $gameStatus.textContent =
      getResult(state.currentPlayer) === 'DRAW' ? 'Draw' : `Winner is ${getResult(state.currentPlayer)}`;
    state.isOver = true;
  });

  document.querySelector('.game-reset').addEventListener('click', () => window.location.reload());
})();

// [고민 사항]
// - X와 O의 상태를 하나의 상태로 저장할지 따로 갖고있을지 고민하였으나 굳이 하나로도 충분한 것을 따로 저장할 필요가 없다고 판단
// - 이기는 경우를 알고리즘으로 계산할지 상수로 가지고 있을지 고민하였으나 상수로 가지고 있어도 좋다고 판단함.
// - 게임 종료 이후 이벤트 리스너를 제거하여 클릭이벤트를 무시하려고 했으나 removeEventListener의 인수로 핸들러를 똑같이 전달해줘야해서 얼리리턴으로 해결
// - try again클릭 시 새로고침을 통해 초기화함. window.location.reload
// - for문 대신에 되도록이면 for...of를 쓰는 것이 좋다.
// - for ... of 문에서 구조분해할당 활용
// - 상태인 것(board, currentPlayer, isEnd)과 상태가 아닌 것(winCase)을 구분하는것이 이번 문제의 핵심이다.
// - getResult를 접근자 프로퍼티로 만드는 것 어떠한가 -윤하-
// - isOver를 따로 갖고 있을 필요가 없다. -채린-
