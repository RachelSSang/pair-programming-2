import Component from '../library/core/Component.js';
import Card from './Card.js';
import { list, card } from '../trelloState.js';

class List extends Component {
  render() {
    const { id, title, cards, isAddingCard } = this.props.board;
    return `
    <li data-list-id="${id}" class="list-item">
      <h2 class="list-title" contenteditable="true">${title}</h2>
      <ul class="card-container">
        ${cards.map(card => new Card({ card }).render()).join('')}
          ${
            isAddingCard
              ? `<li>
                  <form class="add-card-form">
                    <input row="1" placeholder="Enter a title for this card..."></input>
                    <div class="button-container">
                      <button type="submit" class="submit-btn">Add card</button>
                      <button class="close-card-form-btn"><box-icon name="x"></box-icon></button>
                    </div>
                  </form>
                </li>`
              : `<li><button class="add-card-btn">+ Add a card</button></li>`
          }
      </ul>
      <button class="remove-list-btn"><box-icon name='x'></box-icon></button>
    </li>
    `;
  }

  addEventListener() {
    return [
      {
        type: 'click',
        selector: '.list-title',
        handler: e => {
          console.dir(e.target);
        },
      },
      {
        type: 'click',
        selector: '.add-card-btn',
        handler: e => {
          const targetId = +e.target.closest('.list-item').dataset.listId;
          list.toggleIsAddingCard(targetId);
        },
      },
      {
        type: 'click',
        selector: '.remove-list-btn',
        handler: e => {
          const targetId = +e.target.closest('.list-item').dataset.listId;
          list.remove(targetId);
        },
      },
      {
        type: 'submit',
        selector: '.add-card-form',
        handler: e => {
          e.preventDefault();
          const newCardTitle = e.target[0].value;
          if (newCardTitle.trim() === '') return;
          const targetId = +e.target.closest('.list-item').dataset.listId;
          card.add(targetId, newCardTitle);
        },
      },
      {
        type: 'click',
        selector: '.close-card-form-btn',
        handler: e => {
          const targetId = +e.target.closest('.list-item').dataset.listId;
          list.toggleIsAddingCard(targetId);
        },
      },
      {
        type: 'keyup',
        selector: '.close-card-form-btn',
        handler: e => {
          const targetId = +e.target.closest('.list-item').dataset.listId;
          list.toggleIsAddingCard(targetId);
        },
      },
      {
        type: 'keyup',
        selector: '.add-card-form > input',
        handler: e => {
          if (e.key !== 'Escape') return;
          const targetId = +e.target.closest('.list-item').dataset.listId;
          list.toggleIsAddingCard(targetId);
        },
      },
    ];
  }
}

export default List;
