import Component from '../library/Component.js';
import { getGlobalState } from '../library/globalState.js';
import { list, card, modal } from '../trelloState.js';
import sanitizeHTML from '../utils/sanitizeHTML.js';

class Modal extends Component {
  render() {
    const { listId, cardId, isEditingTitle, isEditingDescription } = getGlobalState().modal;
    const targetList = list.getListById(listId);
    const targetCard = card.getCardById(listId, cardId);
    return `
    <div class="modal-wrapper">
      <section class="modal">
        <div class="modal-title-section">
          <box-icon name="window"></box-icon>
          ${
            isEditingTitle
              ? `<textarea autofocus class="modal-title-input">${targetCard?.title}</textarea>`
              : `<h3 class="modal-title">${targetCard?.title}</h3>`
          }
          <p class="modal-list-title">in <span>${targetList?.title}</span></p>
        </div>
        <div class="modal-description-section">
          <box-icon name="list-minus"></box-icon>
          <h4>Description</h4>
          <p class="alert-msg">Save your changes!</p>
          ${
            isEditingDescription
              ? `
              <div class="modal-description-wrapper">
                <textarea row="4" placeholder="Add a more detailed description..." class="modal-description-input">${targetCard?.description}</textarea>
                <button class="save-modal-description-btn">Save</button>
                <button class="cancle-modal-description-btn"><box-icon name="x"></box-icon></button>
              </div>`
              : `${
                  targetCard?.description === ''
                    ? `<p class="modal-description placeholder">Add a more detailed description...</p>`
                    : `<p class="modal-description">${targetCard?.description}</p>`
                }`
          }
        </div>
        <button class="close-modal-btn"><box-icon name="x"></box-icon></button>
      </section>
    </div>`;
  }

  addEvents() {
    return [
      {
        type: 'click',
        selector: '.modal-title',
        handler: e => {
          if (getGlobalState().modal.isEditingDescription) {
            e.target.closest('.modal').querySelector('.modal-description-input').focus();
            return;
          }
          const parentNode = e.target.closest('.modal-title-section');
          modal.activeIsEditingTitle();
          const modalTitleInput = parentNode.querySelector('.modal-title-input');
          modalTitleInput.style.height = 0;
          modalTitleInput.style.height = modalTitleInput.scrollHeight + 'px';
          modalTitleInput.select();
        },
      },
      {
        type: 'focusout',
        selector: '.modal-title-input',
        handler: e => {
          const { listId, cardId } = getGlobalState().modal;
          const beforeTitle = card.getCardById(listId, cardId).title;
          const newTitle = e.target.value.trim() === '' ? beforeTitle : e.target.value;
          card.changeTitle(listId, cardId, sanitizeHTML(newTitle));
          modal.inactiveIsEditingTitle();
        },
      },
      {
        type: 'input',
        selector: '.modal-title-input',
        handler: e => {
          e.target.style.height = 0;
          e.target.style.height = e.target.scrollHeight + 'px';
        },
      },
      {
        type: 'keydown',
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
          const parentNode = e.target.closest('.modal-description-section');
          modal.activeIsEditingDescription();
          const modalDescriptionInput = parentNode.querySelector('.modal-description-input');
          modalDescriptionInput.style.height = 0;
          modalDescriptionInput.style.height = modalDescriptionInput.scrollHeight + 'px';
          modalDescriptionInput.select();
        },
      },
      {
        type: 'click',
        selector: '.cancle-modal-description-btn',
        handler: () => {
          modal.inactiveIsEditingDescription();
          document.querySelector('.modal-description-section .alert-msg').style.display = 'none';
        },
      },
      {
        type: 'click',
        selector: '.save-modal-description-btn',
        handler: e => {
          const { listId, cardId } = getGlobalState().modal;
          const newDescription = e.target
            .closest('.modal-description-wrapper')
            .querySelector('.modal-description-input').value;
          card.changeDescription(listId, cardId, sanitizeHTML(newDescription));
          modal.inactiveIsEditingDescription();
          document.querySelector('.modal-description-section .alert-msg').style.display = 'none';
        },
      },
      {
        type: 'input',
        selector: '.modal-description-input',
        handler: e => {
          e.target.style.height = 0;
          e.target.style.height = e.target.scrollHeight + 'px';
        },
      },
      {
        type: 'keydown',
        selector: '.modal-description-input',
        handler: e => {
          if (e.isComposing || e.keyCode === 229) return;

          if (e.key === 'Escape') {
            modal.inactiveIsEditingDescription();
          }
        },
      },
      {
        type: 'click',
        selector: '.close-modal-btn',
        handler: e => {
          if (!getGlobalState().modal.isEditingDescription) {
            modal.inactive();
            return;
          }
          e.target.closest('.modal').querySelector('.modal-description-input').focus();
          document.querySelector('.modal-description-section .alert-msg').style.display = 'inline-block';
        },
      },
      {
        type: 'click',
        selector: '.modal-wrapper',
        handler: e => {
          if (e.target.matches('.modal-wrapper')) {
            if (getGlobalState().modal.isEditingDescription) {
              e.target.querySelector('.modal-description-input').focus();
              document.querySelector('.modal-description-section .alert-msg').style.display = 'inline-block';
            } else modal.inactive();
            return;
          }
          if (!getGlobalState().modal.isEditingDescription) return;
          e.target.closest('.modal').querySelector('.modal-description-input').focus();
          if (!e.target.matches('.modal-description-input'))
            document.querySelector('.modal-description-section .alert-msg').style.display = 'inline-block';
        },
      },
      // TODO: Escape 입력시 모달 창 닫기
      {
        type: 'keydown',
        selector: '.modal-wrapper',
        handler: e => {
          if (e.key !== 'Escape') return;
          if (e.target.matches('.modal-wrapper')) {
            if (getGlobalState().modal.isEditingDescription) {
              e.target.querySelector('.modal-description-input').focus();
              document.querySelector('.modal-description-section .alert-msg').style.display = 'inline-block';
            } else modal.inactive();
            return;
          }
          if (!getGlobalState().modal.isEditingDescription) return;
          e.target.closest('.modal').querySelector('.modal-description-input').focus();
          document.querySelector('.modal-description-section .alert-msg').style.display = 'inline-block';
        },
      },
    ];
  }
}

export default Modal;
