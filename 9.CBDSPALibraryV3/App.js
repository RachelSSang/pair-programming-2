import { TodoInput, TodoList, TodoFilter } from './components/index.js';
import Component from './library/component.js';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      todos: [
        { id: 3, content: 'Javascript', completed: false },
        { id: 2, content: 'CSS', completed: true },
        { id: 1, content: 'HTML', completed: false },
      ],
      todoFilter: ['All', 'Completed', 'Active'],
      currentTodoFilterId: 0,
    };
  }

  render() {
    return `${new TodoInput({ addTodo: this.addTodo.bind(this) }).render()}
    ${new TodoList({ removeTodo: this.removeTodo.bind(this), toggleTodo: this.toggleTodo.bind(this) }).render(
      this.state
    )}
    ${new TodoFilter({ filterTodo: this.filterTodo.bind(this) }).render(this.state)}`;
  }

  addTodo(e) {
    const getNewTodoId = () => Math.max(...this.state.todos.map(todo => +todo.id), 0) + 1;
    this.setState({ todos: [{ id: getNewTodoId(), content: e.target.value, completed: false }, ...this.state.todos] });
  }

  toggleTodo(e) {
    const targetid = +e.target.closest('.todo-item').dataset.todoid;
    this.setState({
      todos: this.state.todos.map(todo => ({
        ...todo,
        completed: todo.id === targetid ? !todo.completed : todo.completed,
      })),
    });
  }

  removeTodo(e) {
    const targetid = +e.target.closest('.todo-item').dataset.todoid;
    this.setState({ todos: this.state.todos.filter(({ id }) => id !== targetid) });
  }

  filterTodo(e) {
    const filterid = +e.target.dataset.filterid;
    this.setState({ currentTodoFilterId: filterid });
  }
}
