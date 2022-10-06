import Component from '../../library/component.js';
import Card from './Card.js';

export default class Board extends Component {
  render({ id, title, cards, isEditing }) {
    // prettier-ignore
    return `
      <div class="board" data-boardid=${id}></div>
        <h2 class="board-title">${title}</h2>
        <input type="text" placeholder="Enter list title..." value=${title} class="board-title-input" />
        ${cards.map(card => new Card().render(card)).join("")}
        ${isEditing ?
          `<form class="board-add-card-form">
            <textarea placeholder="Enter a title for this card..."></textarea>
            <button class="board-form-add-button">Add card</button>
            <button class="board-form-close-button">X</button>
          </form>`
          : `<button class="board-add-card">+ Add a card</button>`
        }
      </div>`;
  }
}
