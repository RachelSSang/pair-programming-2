import ListContainer from './components/ListContainer.js';

const Board = {
  Lists: [
    {
      id: 1,
      title: 'Tasks To Do',
      cards: [
        { id: 1, title: 'React', description: 'learning react!' },
        { id: 2, title: 'TypeScript', description: '' },
      ],
    },
    {
      id: 2,
      title: 'Completed Tasks',
      cards: [
        { id: 1, title: 'HTML', description: '' },
        { id: 2, title: 'CSS', description: '' },
        { id: 3, title: 'JavaScript', description: '' },
      ],
    },
  ],
};

const render = () => {
  document.querySelector('#root').innerHTML = ListContainer(Board.Lists);
};

render();
