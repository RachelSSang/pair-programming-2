const TodoItem = ({ id, content, completed }) => {
  const innerHTML = `
  <li class="todo-item" data-todoid="${id}">
    <input type="checkbox" ${completed ? 'checked' : ''} class="todo-checkbox" >
    <span class="todo-content">${content}</span>
    <button class="todo-remove">X</button>
  </li>`;

  return innerHTML;
};

export default TodoItem;
