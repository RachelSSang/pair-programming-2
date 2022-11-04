import Component from '../library/core/Component.js';
import { globalState, card, modal } from '../globalState.js';

let listId = null;
let cardId = null;

class Popup extends Component {
  render() {
    if (!globalState.isModalOpened) return '';

    const { isEditingModalTitle, isEditingModalDescription } = globalState;
    const { title: listTitle, cards } = globalState.boards.filter(({ id }) => id === listId)[0];
    const { title: cardTitle, description } = cards.filter(({ id }) => id === cardId)[0];
    return `<div class="modal-wrapper">
      <section class="modal">
        <div class="modal-card-title">
          <box-icon name="window"></box-icon>
          ${
            isEditingModalTitle
              ? `<input type="text" value="${cardTitle}" class="modal-title-input" maxlength="18">`
              : `<h2 class="modal-title">${cardTitle}</h2>`
          }
          <p class="modal-list-title">in list <span>${listTitle}</span></p>
        </div>
        <div class="modal-card-description">
          <box-icon name="list-minus"></box-icon>
          <h4>Description</h4>
          ${
            isEditingModalDescription
              ? `<form class="edit-description-form">
                    <textarea row="4" placeholder="Add a more detailed description..." class="modal-description-textarea">${description}</textarea>
                    <div class="button-container">
                      <button type="submit">Save</button>
                      <button class="close-description-form-btn"><box-icon name="x"></box-icon></button>
                    </div>
                  </form>`
              : `<p class="modal-description">${
                  description === '' ? 'Add a more detailed description...' : description
                }</p>`
          }
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
      {
        type: 'click',
        selector: '.modal-title',
        handler: e => {
          const parentNode = e.target.closest('.modal-card-title');
          modal.toggleIsEditingTitle();
          parentNode.querySelector('.modal-title-input').select();
        },
      },
      {
        type: 'focusout',
        selector: '.modal-title-input',
        handler: e => {
          const beforeTitle = globalState.boards
            .filter(({ id }) => id === listId)[0]
            .cards.filter(({ id }) => id === cardId)[0].title;

          const newTitle = e.target.value.trim() === '' ? beforeTitle : e.target.value;
          card.changeTitle(listId, cardId, newTitle);
          modal.toggleIsEditingTitle();
        },
      },
      {
        type: 'keyup',
        selector: '.modal-title-input',
        handler: e => {
          if (e.code !== 'Enter' && e.code !== 'Escape') return;
          e.target.blur();
        },
      },

      {
        type: 'click',
        selector: '.modal-description',
        handler: e => {
          const parentNode = e.target.closest('.modal-card-description');
          modal.toggleIsEditingDescription();
          parentNode.querySelector('.modal-description-textarea').select();
        },
      },
      {
        type: 'focusout',
        selector: '.modal-description-textarea',
        handler: e => {
          console.dir(e.target);
          console.log(e.target.closest('.close-description-form-btn'));
          if (e.target.closest('.close-description-form-btn')) return;
          const beforeDescription = globalState.boards
            .filter(({ id }) => id === listId)[0]
            .cards.filter(({ id }) => id === cardId)[0].description;

          const newDescription = e.target.value.trim() === '' ? beforeDescription : e.target.value;
          card.changeDescription(listId, cardId, newDescription);
          modal.toggleIsEditingDescription();
        },
      },
      {
        type: 'keyup',
        selector: '.modal-description-textarea',
        handler: e => {
          if (e.code !== 'Escape') return;
          e.target.blur();
        },
      },

      {
        type: 'click',
        selector: '.modal-wrapper',
        handler: e => {
          if (e.target.closest('.modal') && !e.target.closest('.close-modal-btn')) return;
          modal.toggle();
        },
      },
    ];
  }
}

export default Popup;
