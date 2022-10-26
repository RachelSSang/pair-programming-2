import render from './library/dom/render.js';

let globalState = {
  boards: [
    {
      id: 1,
      title: 'Tasks To Do',
      cards: [
        { id: 1, title: 'React', description: 'learning react!' },
        { id: 2, title: 'TypeScript', description: '' },
      ],
      isEditing: false,
    },
    {
      id: 2,
      title: 'Completed Tasks',
      cards: [
        { id: 1, title: 'HTML', description: '' },
        { id: 2, title: 'CSS', description: '' },
        { id: 3, title: 'JavaScript', description: '' },
      ],
      isEditing: false,
    },
  ],
};

const setGlobalState = newState => {
  globalState = { ...globalState, ...newState };
  render();
};

export { globalState, setGlobalState };
