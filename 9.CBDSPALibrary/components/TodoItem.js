const TodoItem = ({ id, content, completed }) => `
<li class="todo-item" data-todoid="${id}">
  <input type="checkbox" ${completed ? 'checked' : ''} class="todo-checkbox" >
  <span class="todo-content">${content}</span>
  <button class="todo-close">X</button>
</li>`;

export default TodoItem;
