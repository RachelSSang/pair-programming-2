import Component from '../library/core/Component.js';
import Card from './Card.js';
import { trelloState, list, card } from '../trelloState.js';

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
        <li class="add-card-wrapper ${isAddingCard ? '' : 'hidden'}">
          <textarea placeholder="Enter a title for this card..." autofocus class="add-card-input"></textarea>
          <button class="save-add-card-btn">Add card</button>
          <button class="cancle-add-card-btn"><box-icon name="x"></box-icon></button>
        </li>
        <li><button class="add-card-btn" ${isAddingCard ? 'hidden' : ''} >+ Add a card</button></li> 
      </ul>
      <button class="remove-list-btn"><box-icon name='x'></box-icon></button>
    </li>`;
  }

  addCard(targetListId, newTitle) {
    if (newTitle.trim() !== '') card.add(targetListId, newTitle);
    document.querySelector('.add-card-input').focus();
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
        selector: '.add-card-btn',
        handler: e => {
          const targetId = +e.target.closest('.list-item').dataset.listId;
          trelloState.lists.filter(({ id }) => id !== targetId).forEach(({ id }) => list.inactiveAddingCard(id));
          list.activeAddingCard(targetId);
          e.target.closest('.card-container').querySelector('.add-card-input').focus();
        },
      },
      {
        type: 'click',
        selector: '.cancle-add-card-btn',
        handler: e => {
          const targetListId = +e.target.closest('.list-item').dataset.listId;
          list.inactiveAddingCard(targetListId);
        },
      },
      {
        type: 'click',
        selector: '.save-add-card-btn',
        handler: e => {
          const newCardTitle = e.target.closest('li').querySelector('.add-card-input').value;
          const targetId = +e.target.closest('.list-item').dataset.listId;
          this.addCard(targetId, newCardTitle);
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
            this.addCard(targetId, newCardTitle);
          }
          if (e.key === 'Escape') {
            list.inactiveAddingCard(targetId);
          }
          e.target.style.height = e.target.scrollHeight + 'px';
        },
      },
      // {
      //   type: 'click',
      //   selector: 'window',
      //   handler: e => {
      //     // const targetId = +e.target.closest('.list-item')?.dataset?.listId;
      //     const targetId = trelloState.lists.filter(list => list.isAddingCard)[0]?.id;

      //     // add-card-btn 또는 list-item의 자식이 아니면 inactive 해라
      //     if (
      //       !e.target.closest(`.list-item[data-list-id="${targetId}"]`) ||
      //       e.target.closest('.list-title-input') ||
      //       e.target.closest('.card-item')
      //     ) {
      //       list.inactiveAddingCard(targetId);
      //     }
      //     // if (e.target.closest('.list-title-input') || e.target.closest('.card-item')) {
      //     //   list.inactiveAddingCard(targetId);
      //     // }
      //     // if (e.target.closest(`.list-item[data-list-id="${targetId}"]`)) {
      //     e.target.querySelector('.add-card-input')?.focus();
      //     // }
      //   },
      // },

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
