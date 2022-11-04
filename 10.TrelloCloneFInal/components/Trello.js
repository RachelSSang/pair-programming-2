import Component from '../library/core/Component.js';
import List from './ListNew.js';
import Modal from './Modal.js';
import { trelloState, trello, list } from '../trelloState.js';

class Trello extends Component {
  render() {
    const { lists, modal, isAddingList } = trelloState;

    // 조건부 렌더링 방식 -> 특정 이벤트 처리가 어려움(여러 이벤트가 등록되는 경우 이미 dom에서 사라진 경우가 존재)
    // return `
    //   <h1>
    //     <box-icon name="trello" type="logo" size="sm" color="#ffffff" flip="vertical"></box-icon>
    //     Trello
    //   </h1>
    //   <ul class="list-container">
    //     ${lists.map(list => new List({ list }).render()).join('')}
    //     ${
    //       isAddingList
    //         ? `<li class="add-list-wrapper">
    //             <textarea placeholder="Enter list title..." autofocus class="add-list-input"></textarea>
    //             <button class="save-add-list-btn">Add list</button>
    //             <button class="cancle-add-list-btn"><i class='bx bx-x'></i></button>
    //           </li>`
    //         : `<li><button class="add-list-btn">+ Add ${lists.length ? 'another' : 'a'} list</button></li>`
    //     }
    //   </ul>
    //   ${modal.isOpened ? new Modal().render() : ''}
    // `;
    return `
      <h1>
        <box-icon name="trello" type="logo" size="sm" color="#ffffff" flip="vertical"></box-icon>
        Trello
      </h1>
      <ul class="list-container">
        ${lists.map(list => new List({ list }).render()).join('')}
        <li class="add-list-wrapper ${isAddingList ? '' : 'hidden'}">
          <textarea placeholder="Enter list title..." autofocus class="add-list-input"></textarea>
          <button class="save-add-list-btn">Add list</button>
          <button class="cancle-add-list-btn"><i class='bx bx-x'></i></button>
        </li>
        <li><button class="add-list-btn ${isAddingList ? 'hidden' : ''}">+ Add ${
      lists.length ? 'another' : 'a'
    } list</button></li>

      </ul>
      ${modal.isOpened ? new Modal().render() : ''}
    `;
  }

  addList(newTitle) {
    if (newTitle.trim() === '') return;
    list.add(newTitle);
    document.querySelector('.add-list-input').focus();
  }

  addEventListener() {
    return [
      {
        type: 'click',
        selector: '.add-list-btn',
        handler: () => {
          trello.activeAddingList();
          document.querySelector('.add-list-input').focus();
        },
      },
      {
        type: 'click',
        selector: '.cancle-add-list-btn',
        handler: () => trello.inactiveAddingList(),
      },
      {
        type: 'click',
        selector: '.save-add-list-btn',
        handler: e => {
          this.addList(e.target.parentNode.querySelector('.add-list-input').value);
        },
      },
      {
        type: 'keydown',
        selector: '.add-list-input',
        handler: e => {
          if (e.key === 'Enter') {
            e.preventDefault();
            this.addList(e.target.value);
          }
          if (e.key === 'Escape') {
            trello.inactiveAddingList();
          }
          e.target.style.height = e.target.scrollHeight + 'px';
        },
      },
      {
        type: 'click',
        selector: 'window',
        handler: e => {
          if (!e.target.matches('.add-list-btn') && !e.target.closest('.add-list-wrapper')) {
            trello.inactiveAddingList();
          }
        },
      },
    ];
  }
}

export default Trello;
