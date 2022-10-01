import Trello from './components/Trello/Trello.js';

let state = {
  boards: [
    {
      id: 1,
      title: 'Tasks to Do',
      todos: [
        { id: 1, content: 'React', description: 'react' },
        { id: 2, content: 'TypeScript' },
      ],
    },
    {
      id: 2,
      title: 'Completed Tasks',
      todos: [
        { id: 1, content: 'HTML' },
        { id: 2, content: 'CSS' },
        { id: 3, content: 'JavaScript' },
      ],
    },
  ],
};

const $root = document.getElementById('root');

const render = state => {
  $root.innerHTML = `
 ${Trello(state)}`;
};

const setState = newState => {
  state = { ...state, ...newState };
  render(state);
};

render(state);
