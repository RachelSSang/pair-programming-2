import Component from '../library/component.js';

export default class TodoItem extends Component {
  render(todo) {
    const { id, completed, content } = todo;
    return `
    <li class="todo-item" data-todoid="${id}">
      <input type="checkbox" ${completed ? 'checked' : ''} class="todo-checkbox" >
      <span class="todo-content">${content}</span>
      <button class="todo-close">X</button>
    </li>`;
  }
}
