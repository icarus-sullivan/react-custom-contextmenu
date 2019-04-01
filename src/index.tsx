import * as React from 'react';

interface State { show: boolean, x: number, y: number };

interface Props { [key: string]: any };

interface Event { [key: string]: any };

interface KeyEvent { [key: string]: any, keyCode: number };

interface ContextMenuEvent { [key: string]: any, pageX: number, pageY: number };

const Context = React.createContext({
  x: 0,
  y: 0,
  show: false,
  dismiss: () => {},
});

export default class ContextMenu extends React.Component<Props, State> {
  static Renderer = Context.Consumer;
  static contextType = Context;

  ref: React.RefObject<any>;
  state: State;
  constructor(props: Props) {
    super(props);

    this.ref = React.createRef();
    this.state = { show: false, x: 0, y: 0 };
  }

  componentDidMount() {
    this.ref.current.addEventListener('contextmenu', this.showContextMenu);
    this.ref.current.addEventListener('mousedown', this.stopPropagation);
    document.addEventListener('keyup', this.conditionalKey);
    document.addEventListener('mousedown', this.conditionalHideMenu);
    document.addEventListener('wheel', this.conditionalHideMenu);
    document.addEventListener('blur', this.conditionalHideMenu);
  }

  componentWillUnmount() {
    this.ref.current.removeEventListener('contextmenu', this.showContextMenu);
    this.ref.current.removeEventListener('mousedown', this.stopPropagation);
    document.removeEventListener('keyup', this.conditionalKey);
    document.removeEventListener('mousedown', this.conditionalHideMenu);
    document.removeEventListener('wheel', this.conditionalHideMenu);
    document.removeEventListener('blur', this.conditionalHideMenu);
  }

  stopPropagation = (e: Event) => {
    e.stopPropagation();
  }

  showContextMenu = (e: ContextMenuEvent) => {
    e.preventDefault();

    this.setState({
      show: true,
      x: e.pageX,
      y: e.pageY + 10,
    });
  };

  conditionalHideMenu = (e: Event) => {
    if (this.state.show) {
      this.setState({ show: false });
    }
  }

  conditionalKey = (e: KeyEvent) => {
    if (e.keyCode === 27) {
      this.setState({ show: false });
    }
  }

  dismiss = () => this.setState({ show: false });

  render() {
    return (
      <Context.Provider value={{ ...this.state, dismiss: this.dismiss }}>
        <div ref={this.ref} {...this.props}>
          {this.props.children}
        </div>
      </Context.Provider>
    );
  }
}