import Component from '../library/component.js';

export default class TodoFilter extends Component {
  constructor(handlers) {
    super();
    const { filterTodo } = handlers;
    this.filterTodo = filterTodo;
  }

  render(state) {
    const { todoFilter, currentTodoFilterId } = state;
    return `<ul class="todo-filters">${todoFilter
      .map(
        (filter, idx) =>
          `<li data-filterid=${idx} class="todo-filter ${currentTodoFilterId === idx ? 'active' : ''}">${filter}</li>`
      )
      .join('')}</ul>`;
  }

  addEvents() {
    return [
      {
        type: 'click',
        selector: '.todo-filter',
        handler: e => this.filterTodo(e),
      },
    ];
  }
}
