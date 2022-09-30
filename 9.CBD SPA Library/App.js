import TodoInput from './components/TodoInput.js';
import TodoList from './components/TodoList.js';
import TodoFilter from './components/TodoFilter.js';

let state = {
  todos: [
    { id: 3, content: 'Javascript', completed: false },
    { id: 2, content: 'CSS', completed: true },
    { id: 1, content: 'HTML', completed: false },
  ],
  todoFilter: ['All', 'Completed', 'Active'],
  currentTodoFilterId: 0,
};

const $root = document.getElementById('root');

const render = state => {
  $root.innerHTML = `
  ${TodoInput()}
  ${TodoList(state)}
  ${TodoFilter(state)}`;
};

const setState = newState => {
  state = { ...state, ...newState };
  render(state);
};

render(state);

const getNewTodoId = () => Math.max(...state.todos.map(todo => +todo.id), 0) + 1;

$root.addEventListener('keyup', e => {
  if (!e.target.matches('.todo-input') || e.key !== 'Enter') return;

  setState({ todos: [{ id: getNewTodoId(), content: e.target.value, completed: false }, ...state.todos] });
});

$root.addEventListener('click', e => {
  if (!e.target.matches('.todo-item :not(.todo-close)')) return;

  const targetid = +e.target.closest('.todo-item').dataset.todoid;
  setState({
    todos: state.todos.map(todo => ({ ...todo, completed: todo.id === targetid ? !todo.completed : todo.completed })),
  });
});

$root.addEventListener('click', e => {
  if (!e.target.matches('.todo-close')) return;

  const targetid = +e.target.closest('.todo-item').dataset.todoid;
  setState({ todos: state.todos.filter(({ id }) => id !== targetid) });
});

$root.addEventListener('click', e => {
  if (!e.target.matches('.todo-filter')) return;

  const filterid = +e.target.dataset.filterid;
  setState({ currentTodoFilterId: filterid });
});
