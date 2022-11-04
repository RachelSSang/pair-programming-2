import Component from '../library/core/Component.js';
import { trelloState, list, card, modal } from '../trelloState.js';

let listId = 1;
let cardId = 1;

class Modal extends Component {
  render() {
    const { isEditingTitle, isEditingDescription } = trelloState.modal;
    const targetList = list.getListById(listId);
    const targetCard = card.getCardById(listId, cardId);
    // const { title: listTitle } = list.getListById(listId);
    // const { title: cardTitle, description } = card.getCardById(listId, cardId);
    return `<div class="modal-wrapper">
      <section class="modal">
        <div class="modal-card-title">
          <box-icon name="window"></box-icon>
          ${
            isEditingTitle
              ? `<textarea autofocus class="modal-title-input">${targetCard?.title}</textarea>`
              : `<h2 class="modal-title">${targetCard?.title}</h2>`
          }
          <p class="modal-list-title">in list <span>${targetList?.title}</span></p>
        </div>
        <div class="modal-card-description">
          <box-icon name="list-minus"></box-icon>
          <h4>Description</h4>
          ${
            isEditingDescription
              ? `<form class="edit-description-form">
                    <textarea row="4" placeholder="Add a more detailed description..." class="modal-description-textarea">${targetCard?.description}</textarea>
                    <div class="button-container">
                      <button type="submit">Save</button>
                      <button class="close-description-form-btn"><box-icon name="x"></box-icon></button>
                    </div>
                  </form>`
              : `<p class="modal-description">${
                  targetCard?.description === '' ? 'Add a more detailed description...' : targetCard?.description
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
          const beforeTitle = card.getCardById(listId, cardId).title;

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
          if (e.target.closest('.close-description-form-btn')) return;
          const beforeDescription = card.getCardById(listId, cardId).description;

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

export default Modal;
