import renderAll from './renderAll.js';

let globalState = {};

const setInitialGlobalState = initialState => {
  globalState = initialState;
};

const getGlobalState = () => globalState;

const setGlobalState = nextState => {
  globalState = typeof nextState === 'function' ? nextState(globalState) : nextState;
  renderAll();
};

export { setInitialGlobalState, getGlobalState, setGlobalState };
