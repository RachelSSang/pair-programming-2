import { TodoFilter, TodoInput, TodoList } from './components/index.js';
import render from './index.js';

let state = {
  todos: [
    { id: 3, content: 'Javascript', completed: false },
    { id: 2, content: 'CSS', completed: true },
    { id: 1, content: 'HTML', completed: false },
  ],
  todoFilter: ['All', 'Completed', 'Active'],
  currentTodoFilterId: 0,
};

const setState = newState => {
  state = { ...state, ...newState };
  console.log(state);

  render();
};

let eventListeners = [];

const App = () => {
  const TodoInputObj = TodoInput(state, setState);
  const TodoListObj = TodoList(state, setState);
  const TodoFilterObj = TodoFilter(state, setState);

  eventListeners = [...TodoInputObj.event, ...TodoFilterObj.event, ...TodoListObj.event];

  return `
  ${TodoInputObj.innerHTML}
  ${TodoListObj.innerHTML}
  ${TodoFilterObj.innerHTML}
  `;
};

export { App, eventListeners };
