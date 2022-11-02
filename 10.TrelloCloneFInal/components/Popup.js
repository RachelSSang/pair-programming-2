import Component from '../library/core/Component.js';
import { globalState } from '../globalState.js';

let listId = null;
let cardId = null;

class Popup extends Component {
  render() {
    if (!globalState.isModalOpened) return '';

    const { title: listTitle, cards } = globalState.boards.filter(({ id }) => id === listId)[0];
    const { title: cardTitle, description } = cards.filter(({ id }) => id === cardId)[0];
    return `<div class="modal-wrapper">
      <section class="modal">
        <div class="modal-card-title">
          <box-icon name="window"></box-icon>
          <h3>${cardTitle}</h3>
          <p class="modal-list-title">in list <span>${listTitle}</span></p>
        </div>
        <div class="modal-description">
          <box-icon name="list-minus"></box-icon>
          <h4>Description</h4>
          <p>${description}</p>
        </div>
        <button class="close-modal-btn"><box-icon name="x"></box-icon></button>
      </section>
    </div>`;
  }

  addEventListener() {
    return [
      {
        type: 'cardClick',
        selector: '#root',
        handler: e => {
          listId = e.detail.listId;
          cardId = e.detail.cardId;
        },
      },
    ];
  }
}

export default Popup;
