import Component from '../library/core/Component.js';
import List from './List.js';
import { globalState, trello } from '../globalState.js';

class Trello extends Component {
  render() {
    const { boards, isAddingList } = globalState;
    return `
      <h1>
        <box-icon name="trello" type="logo" size="sm" color="#ffffff" flip="vertical"></box-icon>
        Trello
      </h1>
      <ul class="list-container">
        ${boards.map(board => `<li class="list-item">${new List({ board }).render()}</li>`).join('')}
        ${
          isAddingList
            ? `<li>
                <form class="add-list-form">
                  <input type="text" placeholder="Enter list title...">
                  <button type="submit">Add list</button>
                  <box-icon name="x"></box-icon>
                </form>
              </li>`
            : `<li><button class="add-list-btn">+ Add another list</button></li>`
        }
      </ul>
    `;
  }

  addEventListener() {
    return [
      {
        type: 'click',
        selector: '.add-list-btn',
        handler: () => {
          trello.toggleIsAddingList();
        },
      },
    ];
  }
}

export default Trello;
