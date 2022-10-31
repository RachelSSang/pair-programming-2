import Component from '../library/core/Component.js';
import { card } from '../globalState.js';

class Card extends Component {
  render() {
    const { id, title, description } = this.props.card;

    return `
    <li data-card-id="${id}" class="card-item">    
      <h3>${title}</h3>
      ${description ? `<box-icon name="signal-3" rotate="90"></box-icon>` : ''}
      <box-icon class="hidden" name="pencil"></box-icon>
      <button class="remove-card-btn"><box-icon name="x"></box-icon></button>
    </li>
    `;
  }

  addEventListener() {
    return [
      {
        type: 'click',
        selector: '.remove-card-btn',
        handler: e => {
          const targetId = +e.target.closest('.card-item').dataset.cardId;
          const targetListId = +e.target.closest('.list-item').dataset.listId;
          card.remove(targetListId, targetId);
        },
      },
    ];
  }
}

export default Card;
