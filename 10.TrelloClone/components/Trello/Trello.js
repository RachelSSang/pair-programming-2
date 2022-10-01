import Board from './Board.js';

const Trello = state => `
  <h1 class="title">Trello</h1>
  <ol class="board-list">
    ${state.boards.map(board => Board(board)).join('')}
  </ol>
`;

export default Trello;
