const TodoInput = (state, setState) => {
  const innerHTML = `<input type="text" placeholder="Enter todo!" autofocus class="todo-input">`;

  const getNewTodoId = () => Math.max(...state.todos.map(todo => +todo.id), 0) + 1;

  const addTodo = e => {
    if (e.key !== 'Enter' || e.target.value.trim() === '') return;
    console.log('input');
    setState({ todos: [{ id: getNewTodoId(), content: e.target.value, completed: false }, ...state.todos] });
  };

  return { innerHTML, event: [{ type: 'keyup', selector: '.todo-input', handler: addTodo }] };
};

export default TodoInput;
