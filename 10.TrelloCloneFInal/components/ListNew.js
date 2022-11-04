import Component from '../library/core/Component.js';
import Card from './Card.js';
import { list, card } from '../trelloState.js';

class List extends Component {
  render() {
    const { id, title, cards, isEditingTitle, isAddingCard } = this.props.list;
    return `
    <li data-list-id="${id}" class="list-item">
      ${
        isEditingTitle
          ? `<textarea autofocus class="list-title-input">${title}</textarea>`
          : `<h2 class="list-title">${title}</h2>`
      }
      <ul class="card-container">
        ${cards.map(card => new Card({ card }).render()).join('')}
          ${
            isAddingCard
              ? `<li>
                  <textarea placeholder="Enter a title for this card..." autofocus class="add-card-input"></textarea>
                  <div class="button-container">
                    <button class="save-add-card-btn">Add card</button>
                    <button class="cancle-add-card-btn"><box-icon name="x"></box-icon></button>
                  </div>
                </li>`
              : `<li><button class="add-card-btn">+ Add a card</button></li>`
          }
      </ul>
      <button class="remove-list-btn"><box-icon name='x'></box-icon></button>
    </li>
    `;
  }

  addEventListener() {
    return [
      {
        type: 'click',
        selector: '.list-title',
        handler: e => {
          const parentNode = e.target.closest('.list-item');
          const targetId = +parentNode.dataset.listId;
          list.toggleIsEditingTitle(targetId);
          parentNode.querySelector('.list-title-input').select();
        },
      },
      {
        type: 'click',
        selector: '.add-card-btn, .cancle-add-card-btn',
        handler: e => {
          const targetId = +e.target.closest('.list-item').dataset.listId;
          list.toggleIsAddingCard(targetId);
          document.querySelector('.add-card-input').focus();
        },
      },

      {
        type: 'click',
        selector: '.save-add-card-btn',
        handler: e => {
          const newCardTitle = e.target.closest('li').querySelector('.add-card-input').value;
          if (newCardTitle.trim() === '') return;
          const targetId = +e.target.closest('.list-item').dataset.listId;
          card.add(targetId, newCardTitle);
          document.querySelector('.add-card-input').focus();
        },
      },
      {
        type: 'keydown',
        selector: '.add-card-input',
        handler: e => {
          const targetId = +e.target.closest('.list-item').dataset.listId;

          if (e.key === 'Enter') {
            e.preventDefault();
            const newCardTitle = e.target.value;
            if (newCardTitle.trim() === '') return;
            card.add(targetId, newCardTitle);
            document.querySelector('.add-card-input').focus();
          }
          if (e.key === 'Escape') {
            list.toggleIsAddingCard(targetId);
          }
          e.target.style.height = e.target.scrollHeight + 'px';
        },
      },

      //   {
      //    type: 'focusout',
      //    selector: '.list-title-input',
      //    handler: e => {
      //      const targetId = +e.target.closest('.list-item').dataset.listId;
      //      const beforeTitle = list.getListById(targetId).title;
      //      const newTitle =
      //        e.target.value.trim() === '' || e.target.value === beforeTitle ? beforeTitle : e.target.value;
      //      list.changeTitle(targetId, newTitle);
      //      list.toggleIsEditingTitle(targetId);
      //    },
      //  },
      //  {
      //    type: 'keyup',
      //    selector: '.list-title-input',
      //    handler: e => {
      //      if (e.code !== 'Enter' && e.code !== 'Escape') return;
      //      e.target.blur();
      //    },
      //  },

      {
        type: 'click',
        selector: '.remove-list-btn',
        handler: e => {
          const targetId = +e.target.closest('.list-item').dataset.listId;
          list.remove(targetId);
        },
      },

      //  {
      //    type: 'submit',
      //    selector: '.add-card-form',
      //    handler: e => {
      //      e.preventDefault();
      //      const newCardTitle = e.target[0].value;
      //      if (newCardTitle.trim() === '') return;
      //      const targetId = +e.target.closest('.list-item').dataset.listId;
      //      card.add(targetId, newCardTitle);
      //    },
      //  },
      // {
      //   type: 'click',
      //   selector: '.close-card-form-btn',
      //   handler: e => {
      //     const targetId = +e.target.closest('.list-item').dataset.listId;
      //     list.toggleIsAddingCard(targetId);
      //   },
      // },
      //    {
      //      type: 'keyup',
      //      selector: '.close-card-form-btn',
      //      handler: e => {
      //        const targetId = +e.target.closest('.list-item').dataset.listId;
      //        list.toggleIsAddingCard(targetId);
      //      },
      //    },
      // {
      //   type: 'keyup',
      //   selector: '.add-card-form > input',
      //   handler: e => {
      //     if (e.key !== 'Escape') return;
      //     const targetId = +e.target.closest('.list-item').dataset.listId;
      //     list.toggleIsAddingCard(targetId);
      //   },
      // },
    ];
  }
}

export default List;
