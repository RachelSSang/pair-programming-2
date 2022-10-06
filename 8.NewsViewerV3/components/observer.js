const GLOBAL_STATE = { category: 'all' };

const observers = [];
const proxy = new Proxy(GLOBAL_STATE, {
  set: (obj, prop, value) => {
    obj[prop] = value;
    observers.forEach(observer => observer(obj[prop]));
    return true;
  },
});

const subscribe = func => observers.push(func);

export { subscribe, proxy };
