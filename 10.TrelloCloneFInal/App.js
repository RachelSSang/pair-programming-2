import Component from './library/core/Component.js';
import Trello from './components/Trello.js';

class App extends Component {
  render() {
    return `
    ${new Trello().render()}
    `;
  }
}

export default App;
