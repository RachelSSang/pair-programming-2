import Component from '../../library/component.js';
import Card from './Card.js';

export default class Board extends Component {
  constructor({ toggleIsEditing, addCard, changeBoardTitle }) {
    super();
    this.toggleIsEditing = toggleIsEditing;
    this.addCard = addCard;
    this.changeBoardTitle = changeBoardTitle;
  }

  render({ id, title, cards, isEditing }) {
    // prettier-ignore
    return `
      <div class="board" data-boardid=${id}>
        <h2 class="board-title">${title}</h2>
        <input type="text" placeholder="Enter list title..." value="${title}" class="board-title-input hidden" />
        ${cards.map(card => new Card().render(card)).join("")}
        ${isEditing ?
          `<form class="board-add-card-form">
            <textarea placeholder="Enter a title for this card..." class="board-form-textarea"></textarea>
            <button class="board-form-add-button">Add card</button>
            <button class="board-form-close-button">X</button>
          </form>`
          : `<button class="board-add-card">+ Add a card</button>`
        }
      </div>`;
  }

  addEvents() {
    return [
      {
        type: 'click',
        selector: '.board-add-card, .board-form-close-button',
        handler: e => this.toggleIsEditing(e),
      },
      {
        type: 'keydown',
        selector: '.board-form-textarea',
        handler: e => {
          if (e.key === 'Escape') this.toggleIsEditing(e);
          if (e.key === 'Enter') {
            e.preventDefault();
            e.target.closest('.board-add-card-form').requestSubmit();
          }
        },
      },
      {
        type: 'submit',
        selector: '.board-add-card-form',
        handler: e => {
          e.preventDefault();
          if (e.target.querySelector('.board-form-textarea').value.trim()) this.addCard(e);
        },
      },
      {
        type: 'click',
        selector: '.board-title',
        handler: e => {
          e.target.classList.toggle('hidden');

          const $input = e.target.nextElementSibling;
          $input.classList.toggle('hidden');

          const endOfInput = $input.value.length;
          $input.setSelectionRange(endOfInput, endOfInput);
          $input.focus();
        },
      },
      {
        type: 'keyup',
        selector: '.board-title-input',
        handler: e => {
          if (e.key !== 'Enter' && e.key !== 'Escape') return;

          e.target.classList.toggle('hidden');
          e.target.previousElementSibling.classList.toggle('hidden');

          if (e.target.value !== e.target.getAttribute('value')) this.changeBoardTitle(e);
        },
      },
    ];
  }
}
