import renderAll from './renderAll.js';

// eslint-disable-next-line import/no-mutable-exports
let globalState = {};

const getGlobalState = () => globalState;

const setGlobalState = nextState => {
  globalState = typeof nextState === 'function' ? nextState(globalState) : nextState;
  renderAll();
};

const setInitialGlobalState = initialState => {
  globalState = initialState;
};

export { getGlobalState, setGlobalState, setInitialGlobalState };
