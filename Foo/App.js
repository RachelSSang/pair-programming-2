import addEventListener from './addEventListener.js';

// const App = () => {
//   const initialState = {
//     a: 1,
//     b: 2,
//   };

//   const hello = e => {
//     console.log('Hello', e);
//     setState({ a: 2 });
//   };

//   addEventListener('click', 'button', hello);

//   return `<button>Hello</button>`;
// };

class Component {
  constructor(props) {
    this.props = props;
    this.state = {};

    const event =  this.addEventListener?.()
  }


  setState(newState) {
    this.state = { ...this.state, ...newState };
    // rerender!!!!
  }
}

class App extends Component {

  addEventListener() {
    return [{'click', 'button', e => {
      console.log('Hello', e);
      this.setState({ a: 2 });
    }]
  }

  render() {
   const child =  new Child().render()
    return `<button>${child}</button>`;
  }
}

export default App;
