import TodoItem from './TodoItem.js';

const TodoList = ({ todos, currentTodoFilterId }) => `
<ol class="todo-list">
  ${todos
    .filter(({ completed }) => (currentTodoFilterId === 1 ? completed : currentTodoFilterId === 2 ? !completed : true))
    .map(todo => TodoItem(todo))
    .join('')}
</ol>`;

export default TodoList;
