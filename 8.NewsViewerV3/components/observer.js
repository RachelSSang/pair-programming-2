const observers = [];
const proxy = new Proxy(
  { category: 'all' },
  {
    set: (obj, prop, value) => {
      obj[prop] = value;
      observers.forEach(observer => observer(obj[prop]));
      return true;
    },
  }
);

const subscribe = func => observers.push(func);

export { subscribe, proxy };
