import { App, eventListeners } from './App.js';
import reconciliation from './library/reconciliation_v0.js';

const render = () => {
  const $realRoot = document.getElementById('root');
  const $virtualRoot = $realRoot.cloneNode();
  $virtualRoot.innerHTML = App();
  reconciliation($realRoot, $virtualRoot);
  eventListeners.forEach(({ type, selector, handler }) => {
    // console.log(type, selector, handler)
    document.body.addEventListener(type, handler);
  });
};

render();
// const $root = document.getElementById('root');

// const getNewTodoId = () => Math.max(...state.todos.map(todo => +todo.id), 0) + 1;

// $root.addEventListener('keyup', e => {
//   if (!e.target.matches('.todo-input') || e.key !== 'Enter' || e.target.value.trim() === '') return;

//   setState({ todos: [{ id: getNewTodoId(), content: e.target.value, completed: false }, ...state.todos] });
// });

// $root.addEventListener('click', e => {
//   if (!e.target.matches('.todo-item :not(.todo-close)')) return;

//   const targetid = +e.target.closest('.todo-item').dataset.todoid;
//   setState({
//     todos: state.todos.map(todo => ({ ...todo, completed: todo.id === targetid ? !todo.completed : todo.completed })),
//   });
// });

// $root.addEventListener('click', e => {
//   if (!e.target.matches('.todo-close')) return;

//   const targetid = +e.target.closest('.todo-item').dataset.todoid;
//   setState({ todos: state.todos.filter(({ id }) => id !== targetid) });
// });

// $root.addEventListener('click', e => {
//   if (!e.target.matches('.todo-filter')) return;

//   const filterid = +e.target.dataset.filterid;
//   setState({ currentTodoFilterId: filterid });
// });

export default render;
