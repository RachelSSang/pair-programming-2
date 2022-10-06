import Component from '../../library/component.js';
import Board from './Board.js';

export default class Trello extends Component {
  render(state) {
    const { boards } = state;
    // list목록
    return `
    <h1 class="trell-title">Trello</h1>
    ${boards.map(board => new Board().render(board)).join('')}
    <button class="trello-add-board">+ Add a list</button>
    `;
  }
}
