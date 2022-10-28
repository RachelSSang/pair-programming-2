import Component from '../library/core/Component.js';
import Card from './Card.js';
import { list } from '../globalState.js';

class List extends Component {
  render() {
    const { id, title, cards, isEditingTitle, isAddingCard } = this.props.board;
    return `
    ${isEditingTitle ? `<input type="text" value="${title}" class="title-input">` : `<h2>${title}</h2>`}
    <ul data-list-id="${id}" class="card-container">
      ${cards.map(card => `<li class="card-item">${new Card({ card }).render()}</li>`).join('')}
        ${
          isAddingCard
            ? `<li>
                <form class="add-card-form">
                  <textarea row="1" placeholder="Enter a title for this card..."></textarea>
                  <div class="button-container">
                    <button type="submit" class="submit-btn">Add card</button>
                    <button><box-icon name="x"></box-icon></button>
                  </div>
                </form>
              </li>`
            : `<li><button class="add-card-btn">+ Add a card</button></li>`
        }
    </ul>
    `;
  }

  addEventListener() {
    return [
      {
        type: 'click',
        selector: '.add-card-btn',
        handler: e => {
          const targetId = +e.target.closest('.card-container').dataset.listId;
          list.toggleIsAddingCard(targetId);
        },
      },
    ];
  }
}

export default List;
