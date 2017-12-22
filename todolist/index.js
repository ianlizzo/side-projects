'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ToDoList = function (_React$Component) {
  _inherits(ToDoList, _React$Component);

  function ToDoList() {
    _classCallCheck(this, ToDoList);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this));

    _this.state = { list: [] };
    _this.addToList = _this.addToList.bind(_this);
    _this.deleteToDo = _this.deleteToDo.bind(_this);

    return _this;
  }

  ToDoList.prototype.addToList = function addToList(data) {
    var list = this.state.list.slice();
    list.push(data);
    this.setState({ list: list });
  };

  ToDoList.prototype.deleteToDo = function deleteToDo(item) {
    var list = this.state.list.filter(function (el) {
      return el !== item;
    });
    this.setState({
      list: list
    });
  };

  ToDoList.prototype.render = function render() {
    var _this2 = this;

    var newList = this.state.list;
    return React.createElement(
      'div',
      null,
      React.createElement(
        'ul',
        null,
        newList.map(function (todo) {
          return React.createElement(
            'li',
            { key: todo },
            todo,
            React.createElement(
              'button',
              { onClick: function onClick() {
                  _this2.deleteToDo(todo);
                } },
              'X'
            )
          );
        })
      ),
      React.createElement(MyComponent, { addToList: this.addToList })
    );
  };

  return ToDoList;
}(React.Component);

var MyComponent = function (_React$Component2) {
  _inherits(MyComponent, _React$Component2);

  function MyComponent() {
    _classCallCheck(this, MyComponent);

    var _this3 = _possibleConstructorReturn(this, _React$Component2.call(this));

    _this3.state = {
      inputValue: ''
    };
    _this3.updateInputValue = _this3.updateInputValue.bind(_this3);
    _this3.addToDo = _this3.addToDo.bind(_this3);
    return _this3;
  }

  MyComponent.prototype.render = function render() {
    return React.createElement(
      'div',
      null,
      React.createElement('input', { value: this.state.inputValue, onChange: this.updateInputValue, placeholder: 'e.g. "watch Goblin"' }),
      React.createElement(
        'button',
        { onClick: this.addToDo },
        'Submit you noob'
      )
    );
  };

  MyComponent.prototype.updateInputValue = function updateInputValue(evt) {
    this.setState({ inputValue: evt.target.value });
  };

  MyComponent.prototype.addToDo = function addToDo() {
    this.props.addToList(this.state.inputValue);
  };

  return MyComponent;
}(React.Component);

;

ReactDOM.render(React.createElement(ToDoList, null), document.getElementById('root'));