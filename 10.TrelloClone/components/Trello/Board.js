// const Board = ({ title, todos }) => `
//   <div class="board">
//     <h2 class="board-title">${title}</h2>
//     ${todos
//       .map(
//         ({ content, description }) => `
//           <div class="card">
//             <span class="card-content">${content}</span>
//             ${description ? 'description 아이콘' : ''}
//           </div>`
//       )
//       .join('')}
//   </div>
// `;

// export default Board;

import CardContainer from './CardContainer.js';

// prettier-ignore
const Board = ({id, title, cards})=>`
  <li class="list" data-list-id="${id}">

  ${title===""?`<input type="text" placeholder="Enter list title..." value="${title}" class="list-title-input" />
  <button class="list-add">Add list </button>
  <button class="list-close">X</button>`:`<h2 class="list-title">${title}</h2>`}
  ${CardContainer(cards)}
    <button class="card-add ${title===''?"":"hidden"}">+Add a card ${title===''?"":"hidden"}</button>
  </li>
`

export default Board;
