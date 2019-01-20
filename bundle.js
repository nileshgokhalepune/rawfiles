(function(React, _reactNative, createStackNavigator, createAppContainer){


  const navigator = createStackNavigator({
    Home : {screen: Home },
    Other : {screen: Other}
  })

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App(props) {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

    _this.toggleDrawer = function () {
      _this.setState({ showDrawer: !_this.state.showDrawer });
    };

    _this.state = {
      showDrawer: false
    };
    _this.Navigation = createAppContainer(navigator);
    return _this;
  }

  _createClass(App, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var showDrawer = this.state.showDrawer ? React.createElement(Drawer, this.props) : null;
      return React.createElement(
        _reactNative.View,
        null,
        React.createElement(
          _reactNative.View,
          null,
          React.createElement(
            _reactNative.TouchableHighlight,
            { style: { marginTop: 10, borderRadius: 20, borderColor: 'red' }, onPress: function onPress() {
                return _this2.toggleDrawer();
              } },
            React.createElement(_reactNative.Image, { style: { width: 50, height: 50, marginTop: 20 }, source: { uri: 'https://icons-for-free.com/free-icons/png/64/105234.png' } })
          )
        ),
        React.createElement(
          _reactNative.View,
          null,
          showDrawer
        )
      );
    }
  }]);

  return App;
}(React.Component);

exports.default = App;

var Drawer = function (_React$Component2) {
  _inherits(Drawer, _React$Component2);

  function Drawer(props) {
    _classCallCheck(this, Drawer);

    var _this3 = _possibleConstructorReturn(this, (Drawer.__proto__ || Object.getPrototypeOf(Drawer)).call(this, props));

    var ds = new _reactNative.ListView.DataSource({ rowHasChanged: function rowHasChanged(r1, r2) {
        return r1 !== r2;
      } });
    _this3.state = {
      dataSource: ds.cloneWithRows(['row1', 'row 2', 'row 3'])
    };
    return _this3;
  }

  _createClass(Drawer, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        _reactNative.View,
        null,
        React.createElement(_reactNative.ListView, {
          dataSource: this.state.dataSource,
          renderRow: function renderRow(rowData) {
            return React.createElement(
              _reactNative.Text,
              null,
              rowData
            );
          }
        })
      );
    }
  }]);

  return Drawer;
}(React.Component);

  return {
    App: App
  }
})
