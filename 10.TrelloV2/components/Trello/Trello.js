import Component from '../../library/component.js';
import Board from './Board.js';

export default class Trello extends Component {
  constructor({ toggleIsEditing, addCard, changeBoardTitle, addBoard }) {
    super();
    this.toggleIsEditing = toggleIsEditing;
    this.addCard = addCard;
    this.changeBoardTitle = changeBoardTitle;
    this.addBoard = addBoard;
  }

  render(state) {
    const { boards } = state;
    // list목록
    // prettier-ignore
    return `
    <h1 class="trello-title">Trello</h1>
    <div class="trello-container">
      ${boards.map(board =>
        new Board({
          toggleIsEditing: this.toggleIsEditing,
          addCard: this.addCard,
          changeBoardTitle: this.changeBoardTitle,
        }).render(board)).join('')}
      <button class="trello-add-board ${boards.length ? '' : 'hidden'}">+ Add a list</button>
      <form class="trello-add-board-form ${boards.length ? 'hidden' : ''}">
        <textarea placeholder="Enter list title..." class="trello-form-textarea"></textarea>
        <button class="trello-form-add-button">Add list</button>
        <button type="button" class="trello-form-close-button">X</button>
      </form>
    </div>`;
  }

  addEvents() {
    return [
      {
        type: 'click',
        selector: '.trello-add-board',
        handler: e => {
          e.target.classList.toggle('hidden');
          e.target.nextElementSibling.classList.toggle('hidden');
        },
      },
      {
        type: 'click',
        selector: '.trello-form-close-button',
        handler: e => {
          e.target.closest('.trello-add-board-form').reset();
          e.target.closest('.trello-add-board-form').classList.toggle('hidden');
          e.target.closest('.trello-add-board-form').previousElementSibling.classList.toggle('hidden');
        },
      },
      {
        type: 'keydown',
        selector: '.trello-form-textarea',
        handler: e => {
          const $form = e.target.closest('.trello-add-board-form');
          if (e.key === 'Escape') {
            e.target.value = '';
            $form.classList.toggle('hidden');
            $form.previousElementSibling.classList.toggle('hidden');
          }
          if (e.key === 'Enter') {
            e.preventDefault();
            $form.requestSubmit();
          }
        },
      },
      {
        type: 'submit',
        selector: '.trello-add-board-form',
        handler: e => {
          e.preventDefault();
          if (e.target.querySelector('.trello-form-textarea').value.trim()) this.addBoard(e);
        },
      },
    ];
  }
}
