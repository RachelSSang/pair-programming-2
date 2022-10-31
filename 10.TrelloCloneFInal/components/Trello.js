import Component from '../library/core/Component.js';
import List from './List.js';
import { globalState, trello, list } from '../globalState.js';

class Trello extends Component {
  render() {
    const { boards, isAddingList } = globalState;
    return `
      <h1>
        <box-icon name="trello" type="logo" size="sm" color="#ffffff" flip="vertical"></box-icon>
        Trello
      </h1>
      <ul class="list-container">
        ${boards.map(board => new List({ board }).render()).join('')}
        ${
          isAddingList
            ? `<li>
                <form class="add-list-form">
                  <input type="text" placeholder="Enter list title..." autofocus>
                  <button type="submit">Add list</button>
                  <button class="close-list-form-btn"><box-icon name="x"></box-icon></button>
                </form>
              </li>
              `
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
      {
        type: 'submit',
        selector: '.add-list-form',
        handler: e => {
          e.preventDefault();
          const newTitle = e.target[0].value;
          if (newTitle.trim() === '') return;
          list.add(newTitle);
          document.querySelector('.add-list-form > input').focus();
        },
      },
      {
        type: 'keyup',
        selector: '.add-list-form > input',
        handler: e => {
          if (e.key !== 'Escape') return;
          trello.toggleIsAddingList();
        },
      },
      {
        type: 'click',
        selector: '.close-list-form-btn',
        handler: () => {
          trello.toggleIsAddingList();
        },
      },
    ];
  }
}

export default Trello;
