import Component from '../library/component.js';

export default class TodoInput extends Component {
  constructor(handlers) {
    super();
    const { addTodo } = handlers;
    this.addTodo = addTodo;
  }

  render() {
    return `<input type="text" placeholder="Enter todo!" autofocus class="todo-input">`;
  }

  addEvents() {
    return [
      {
        type: 'keyup',
        selector: '.todo-input',
        handler: e => {
          if (e.key !== 'Enter' || e.target.value.trim() === '') return;
          this.addTodo(e);
        },
      },
    ];
  }
}
