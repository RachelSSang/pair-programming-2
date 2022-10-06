const eventHolder = [];

const addEventListener = (type, selector, handler) => {
  eventHolder.push({ type, selector, handler });
};

export { eventHolder };
export default addEventListener;
