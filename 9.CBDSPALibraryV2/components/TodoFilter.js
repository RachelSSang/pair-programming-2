const TodoFilter = (state, setState) => {
  const { todoFilter, currentTodoFilterId } = state;
  const innerHTML = `<ul class="todo-filters">${todoFilter
    .map(
      (filter, idx) =>
        `<li data-filterid=${idx} class="todo-filter ${currentTodoFilterId === idx ? 'active' : ''}">${filter}</li>`
    )
    .join('')}</ul>`;

  const filterTodo = e => {
    if (!e.target.matches('.todo-filter')) return;
    console.log('filter');
    const filterid = +e.target.dataset.filterid;
    setState({ currentTodoFilterId: filterid });
  };

  return { innerHTML, event: [{ type: 'click', selector: '.todo-filters', handler: filterTodo }] };
};

export default TodoFilter;
