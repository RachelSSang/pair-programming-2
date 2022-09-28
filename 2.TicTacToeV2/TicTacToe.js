// do something!
const TicTacToe = $root => {
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
    currentPlayer: 'X',
    board: Array(9).fill(''),
    get result() {
      for (const [x, y, z] of WIN_CASES) {
        if (this.board[x] && this.board[x] === this.board[y] && this.board[y] === this.board[z]) return this.board[x];
      }
      return this.board.filter(cell => cell).length === 9 ? 'DRAW' : 'ING';
    },
  };

  const render = () => {
    // prettier-ignore
    $root.innerHTML = `
    <h1 class="title">Tic Tac Toe</h1>
      <div class="game">
      <div class="game-status">${
        state.result === 'ING' ? `Next Player : ${state.currentPlayer}` : state.result === 'DRAW' ? `Draw` : `Winner is ${state.result}`
      }</div>
      <div class="game-grid">
        ${state.board.map((cell, idx) => `<div class="game-grid-item" data-id="${idx}">${cell}</div>`).join('')}
      </div>
      <button class="game-reset">Try again?</button>
    </div>`;
  };

  window.addEventListener('DOMContentLoaded', render);

  $root.addEventListener('click', e => {
    if (!e.target.matches('.game-grid-item') || e.target.textContent || state.result !== 'ING') return;

    state.board[+e.target.dataset.id] = state.currentPlayer;
    state.currentPlayer = state.currentPlayer === 'O' ? 'X' : 'O';

    render();
  });

  $root.addEventListener('click', e => {
    if (!e.target.matches('.game-reset')) return;

    window.location.reload();
  });
};

export default TicTacToe;

// 회고
// - result는 state에 종속적이므로 접근자 프로퍼티로 구현하였다.
// - 상태로 가지고 있던 isOver는 result로 대체할 수 있으므로 상태에서 제거하였다.
// - 요구사항이 바뀜에 따라 동적으로 html을 그려주었다.
// - 클릭마다 전체 렌더링을 하기 때문에 render함수로 만들어주었다.
// - 자바스크립트가 state를 기반으로 렌더링하기 때문에 흐름이 일관성있게 변하였다.
// -
