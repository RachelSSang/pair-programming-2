const TodoFilter = ({ todoFilter, currentTodoFilterId }) =>
  `<ul class="todo-filters">
    ${todoFilter
      .map(
        (filter, idx) =>
          `<li data-filterid=${idx} class="todo-filter ${currentTodoFilterId === idx ? 'active' : ''}">${filter}</li>`
      )
      .join('')}
  </ul>`;
export default TodoFilter;
