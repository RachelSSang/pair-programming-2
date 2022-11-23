import Component from '../library/core/Component.js';
import { card, modal } from '../trelloState.js';

class Card extends Component {
  render() {
    const { id, title, description } = this.props.card;

    return `
    <li data-card-id="${id}" class="card-item draggable">    
      <h3 class="card-title">${title}</h3>
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
        selector: '.card-item',
        handler: e => {
          if (e.target.closest('.remove-card-btn')) return;
          const cardId = +e.target.closest('.card-item').dataset.cardId;
          const listId = +e.target.closest('.list-item').dataset.listId;
          const cardClick = new CustomEvent('cardClick', { detail: { cardId, listId } });
          document.getElementById('root').dispatchEvent(cardClick);
          modal.toggle();
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
      // {
      //   type: 'mousedown',
      //   selector: '.card-item',
      //   handler: e => {
      //     const ghostNode = e.target.closest('.card-item').cloneNode(true);
      //     ghostNode.classList.add('ghost');
      //     ghostNode.style.display = 'none';
      //     document.body.appendChild(ghostNode);
      //     draggingId = +e.target.closest('.card-item').dataset.listId;

      //     // mouseDownPosition.x =
      //     //   e.offsetX - e.target.closest('.card-item').getBoundingClientRect().x + e.target.getBoundingClientRect().x;
      //     // mouseDownPosition.y =
      //     //   e.offsetY - e.target.closest('.card-item').getBoundingClientRect().y + e.target.getBoundingClientRect().y;
      //   },
      // },
    ];
  }
}

export default Card;
