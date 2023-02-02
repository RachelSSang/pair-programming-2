import Component from '../library/Component.js';
import { card, modal } from '../trelloState.js';

class Card extends Component {
  render() {
    const { id, title, description } = this.props.card;

    return `
    <li data-card-id="${id}" class="card-item draggable">    
      <h3 class="card-title">${title}</h3>
      ${description ? `<box-icon name="signal-3" rotate="90"></box-icon>` : ''}
      <button class="remove-card-btn"><box-icon name="x"></box-icon></button>
    </li>
    `;
  }

  addEvents() {
    return [
      {
        type: 'click',
        selector: '.card-item',
        handler: e => {
          if (e.target.closest('.remove-card-btn')) return;
          const cardId = +e.target.closest('.card-item').dataset.cardId;
          const listId = +e.target.closest('.list-item').dataset.listId;
          modal.active(listId, cardId);
        },
      },
      {
        type: 'click',
        selector: '.remove-card-btn',
        handler: e => {
          const cardId = +e.target.closest('.card-item').dataset.cardId;
          const listId = +e.target.closest('.list-item').dataset.listId;
          card.remove(listId, cardId);
        },
      },
    ];
  }
}

export default Card;
