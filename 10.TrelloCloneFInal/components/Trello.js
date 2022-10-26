import Component from '../library/core/Component.js';
import List from './List.js';
import { globalState, setGlobalState } from '../globalState.js';

class Trello extends Component {
  render() {
    return `
      <h1>Trello</h1>
      ${globalState.boards.map(board => new List({ board }).render()).join('')}
    `;
  }
}

export default Trello;
