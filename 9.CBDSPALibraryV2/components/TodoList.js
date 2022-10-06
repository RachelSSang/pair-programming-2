import TodoItem from './TodoItem.js';

const TodoList = (state, setState) => {
  const { todos, currentTodoFilterId } = state;
  const innerHTML = `
    <ol class="todo-list">
      ${todos
        .filter(({ completed }) =>
          currentTodoFilterId === 1 ? completed : currentTodoFilterId === 2 ? !completed : true
        )
        .map(todo => TodoItem(todo))
        .join('')}
    </ol>`;

  const toggleTodo = e => {
    if (!e.target.matches('.todo-item :not(.todo-remove)')) return;
    console.log('toggle');
    const targetid = +e.target.closest('.todo-item').dataset.todoid;
    setState({
      todos: state.todos.map(todo => ({ ...todo, completed: todo.id === targetid ? !todo.completed : todo.completed })),
    });
  };

  const removeTodo = e => {
    if (!e.target.matches('.todo-remove')) return;
    console.log('remove');
    const targetid = +e.target.closest('.todo-item').dataset.todoid;
    setState({ todos: state.todos.filter(({ id }) => id !== targetid) });
  };

  return {
    innerHTML,
    event: [
      { type: 'click', selector: '.todo-list', handler: toggleTodo },
      { type: 'click', selector: '.todo-list', handler: removeTodo },
    ],
  };
};

export default TodoList;
