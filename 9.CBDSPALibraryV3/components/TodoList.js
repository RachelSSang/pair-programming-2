import Component from '../library/component.js';
import TodoItem from './TodoItem.js';

export default class TodoList extends Component {
  constructor(handlers) {
    super();
    const { removeTodo, toggleTodo } = handlers;
    this.removeTodo = removeTodo;
    this.toggleTodo = toggleTodo;
  }

  render(state) {
    const { todos, currentTodoFilterId } = state;
    return `
    <ol class="todo-list">
      ${todos
        .filter(({ completed }) =>
          currentTodoFilterId === 1 ? completed : currentTodoFilterId === 2 ? !completed : true
        )
        .map(todo => new TodoItem().render(todo))
        .join('')}
    </ol>`;
  }

  addEvents() {
    return [
      {
        type: 'click',
        selector: '.todo-item :not(.todo-close)',
        handler: e => this.toggleTodo(e),
      },
      {
        type: 'click',
        selector: '.todo-close',
        handler: e => this.removeTodo(e),
      },
    ];
  }
}
