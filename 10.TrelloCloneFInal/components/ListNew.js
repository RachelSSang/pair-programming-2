import Component from '../library/core/Component.js';
import Card from './Card.js';
import { trelloState, list, card } from '../trelloState.js';
import sanitizeHTML from '../utils/sanitizeHTML.js';

let draggingListId = -1;
let draggingCardId = -1;
let draggingCardListId = -1;
const mouseDownPosition = { x: -1, y: -1 };

class List extends Component {
  render() {
    const { id, title, cards, isEditingTitle, isAddingCard } = this.props.list;
    return `
    <li data-list-id="${id}" class="list-item draggable">
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
    if (newTitle.trim() !== '') card.add(targetListId, sanitizeHTML(newTitle));
    document.querySelector(`.list-item[data-list-id="${targetListId}"] .add-card-input`).focus();
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
          const listTitleInput = parentNode.querySelector('.list-title-input');
          listTitleInput.style.height = listTitleInput.scrollHeight + 'px';
          listTitleInput.select();
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
        type: 'input',
        selector: '.add-card-input',
        handler: e => {
          e.target.style.height = 0;
          e.target.style.height = e.target.scrollHeight + 'px';
        },
      },
      {
        type: 'keydown',
        selector: '.add-card-input',
        handler: e => {
          if (e.isComposing || e.keyCode === 229) return;

          const targetId = +e.target.closest('.list-item').dataset.listId;

          if (e.key === 'Enter') {
            e.preventDefault();
            const newCardTitle = e.target.value;
            this.addCard(targetId, newCardTitle);
          }
          if (e.key === 'Escape') {
            list.inactiveAddingCard(targetId);
          }
        },
      },
      {
        type: 'focusout',
        selector: '.list-title-input',
        handler: e => {
          const targetId = +e.target.closest('.list-item').dataset.listId;
          const beforeTitle = list.getListById(targetId).title;
          const newTitle =
            e.target.value.trim() === '' || e.target.value === beforeTitle ? beforeTitle : e.target.value;
          list.changeTitle(targetId, sanitizeHTML(newTitle));
          list.toggleIsEditingTitle(targetId);
        },
      },
      {
        type: 'input',
        selector: '.list-title-input',
        handler: e => {
          e.target.style.height = 0;
          e.target.style.height = e.target.scrollHeight + 'px';
        },
      },
      {
        type: 'keydown',
        selector: '.list-title-input',
        handler: e => {
          if (e.code !== 'Enter' && e.code !== 'Escape') return;
          e.target.blur();
        },
      },
      {
        type: 'click',
        selector: '.remove-list-btn',
        handler: e => {
          const targetId = +e.target.closest('.list-item').dataset.listId;
          list.remove(targetId);
        },
      },
      {
        type: 'mousedown',
        selector: '.draggable',
        handler: e => {
          const ghostNode = e.target.closest('.draggable').cloneNode(true);
          ghostNode.classList.add('ghost');
          ghostNode.style.display = 'none';
          document.body.appendChild(ghostNode);

          if (ghostNode.matches('.list-item')) {
            draggingListId = +e.target.closest('.draggable').dataset.listId;
            // document.querySelector(`.list-item[data-list-id="${draggingListId}"]`)?.classList.add('dragging');
          } else if (ghostNode.matches('.card-item')) {
            draggingCardId = +e.target.closest('.draggable').dataset.cardId;
            draggingCardListId = +e.target.closest('.list-item').dataset.listId;
          }

          mouseDownPosition.x =
            e.offsetX - e.target.closest('.draggable').getBoundingClientRect().x + e.target.getBoundingClientRect().x;
          mouseDownPosition.y =
            e.offsetY - e.target.closest('.draggable').getBoundingClientRect().y + e.target.getBoundingClientRect().y;
        },
      },
      {
        type: 'mousemove',
        selector: 'window',
        handler: e => {
          const ghostNode = document.querySelector('.ghost');
          if (!ghostNode) return;

          ghostNode.style.display = 'block';
          ghostNode.style.left = e.clientX - mouseDownPosition.x + 'px';
          ghostNode.style.top = e.clientY - mouseDownPosition.y + 'px';

          if (!e.target.closest('.list-item.draggable')) return;

          // TODO: 성능 개선 -> 다시하기
          // 리스트 아이템을 이동중이었따ㅣ?
          if (ghostNode.matches('.list-item')) {
            console.log(e.target);
            console.log(draggingListId, +e.target.closest('.list-item.draggable').dataset.listId);
            if (draggingListId === +e.target.closest('.list-item.draggable').dataset.listId) {
              // TODO: 왜 여기서?
              document.querySelector(`.list-item[data-list-id="${draggingListId}"]`)?.classList.add('dragging');
              return;
            }

            console.log('list insert');
            draggingListId = +e.target.closest('.list-item.draggable').dataset.listId;
            console.log('@@@@@', draggingListId, +ghostNode.dataset.listId);
            list.insert(+ghostNode.dataset.listId, draggingListId);
          }
          // 카드 아이템을 이동중이어따ㅏ??
          else if (ghostNode.matches('.card-item')) {
            // console.log(draggingListId, draggingCardId, draggingCardListId, e.target);

            document
              .querySelector(
                `.list-item[data-list-id="${draggingCardListId}"] .card-item[data-card-id="${draggingCardId}"]`
              )
              ?.classList.add('dragging');

            console.log('card insert');
            // draggingCardId = +e.target.closest('.draggable').dataset.cardId;
            // draggingCardListId = +e.target.closest('.list-item').dataset.listId;
          }
        },
      },
      // {
      //   type: 'mouseover',
      //   selector: '.list-item',
      //   handler: e => {
      //     // console.log('mouseover');
      //     const ghostNode = document.querySelector('.ghost');
      //     if (!ghostNode) return;

      //     console.log(draggingListId);
      //     list.insert(e.target.closest('.list-item').dataset.listId, ghostNode.dataset.listId);
      //     // draggingListId = e.target.closest('.list-item').dataset.listId;
      //   },
      // },
      {
        type: 'mouseup',
        selector: 'window',
        handler: e => {
          const ghostNode = document.querySelector('.ghost');
          if (!ghostNode) return;

          document.body.removeChild(ghostNode);

          // if (e.target.closest('.draggable').matches('.list-item')) {
          //   if (draggingListId === +e.target.closest('.draggable').dataset.listId) {
          //     document.querySelector(`.draggable[data-list-id="${draggingListId}"]`)?.classList.add('dragging');
          //     return;
          //   }

          //   draggingListId = +e.target.closest('.draggable').dataset.listId;
          //   list.swap(draggingListId, +ghostNode.dataset.listId);
          // } else if (e.target.closest('.draggable').matches('.card-item')) {
          //   console.log('card-swap');
          // }

          draggingListId = -1;
          draggingCardId = -1;

          // if (!e.target.closest('.draggable')) {
          console.log(document.querySelector('.dragging'));
          document.querySelector('.dragging')?.classList.remove('dragging');
          // return;
          // }

          // list.insert(+e.target.closest('.draggable').dataset.listId, +ghostNode.dataset.listId);
        },
      },
      // {
      //   type: 'dragend',
      //   selector: '.list-item',
      //   handler: e => {
      //     console.log('dragend');

      //     const ghostNode = document.querySelector('.ghost');
      //     document.body.removeChild(ghostNode);

      //     // const dropZone = document.querySelector('.drop-zone');
      //     // document.body.removeChild(dropZone);

      //     e.target.classList.remove('dragging');
      //   },
      // },
    ];
  }
}

export default List;
