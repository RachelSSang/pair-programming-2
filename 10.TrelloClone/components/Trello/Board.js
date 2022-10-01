const Board = ({ title, todos }) => `
  <div class="board">
    <h2 class="board-title">${title}</h2>
    ${todos
      .map(
        ({ content, description }) => `
          <div class="card">
            <span class="card-content">${content}</span>
            ${description ? 'description 아이콘' : ''}
          </div>`
      )
      .join('')}
  </div>
`;

export default Board;
