
(function(React, _reactNative, _reactNavigation){
  var Home = exports.Home = function (_React$Component) {
    _inherits(Home, _React$Component);

    function Home() {
      _classCallCheck(this, Home);

      return _possibleConstructorReturn(this, (Home.__proto__ || Object.getPrototypeOf(Home)).apply(this, arguments));
    }

    _createClass(Home, [{
      key: 'render',
      value: function render() {
        return React.createElement(
          _reactNative.Text,
          null,
          'HOme SCreen'
        );
      }
    }]);

    return Home;
  }(React.Component);

  var Other = exports.Other = function (_React$Component2) {
    _inherits(Other, _React$Component2);

    function Other() {
      _classCallCheck(this, Other);

      return _possibleConstructorReturn(this, (Other.__proto__ || Object.getPrototypeOf(Other)).apply(this, arguments));
    }

    _createClass(Other, [{
      key: 'render',
      value: function render() {
        return React.createElement(
          _reactNative.Text,
          null,
          'OTher component'
        );
      }
    }]);

    return Other;
  }(React.Component);

  var Navigator = (0, _reactNavigation.createStackNavigator)({
    Home: { screen: Home },
    About: { screen: Other }
  });



  var App = function (_React$Component3) {
    _inherits(App, _React$Component3);

    function App(props) {
      _classCallCheck(this, App);

      var _this3 = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

      _this3.toggleDrawer = function () {
        _this3.setState({ showDrawer: !_this3.state.showDrawer });
      };

      _this3.state = {
        showDrawer: false
      };
      return _this3;
    }

    _createClass(App, [{
      key: 'render',
      value: function render() {
        var _this4 = this;

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
                debugger;
                  return _this4.toggleDrawer();
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

  var Drawer = function (_React$Component4) {
    _inherits(Drawer, _React$Component4);

    function Drawer(props) {
      _classCallCheck(this, Drawer);

      var _this5 = _possibleConstructorReturn(this, (Drawer.__proto__ || Object.getPrototypeOf(Drawer)).call(this, props));

      var ds = new _reactNative.ListView.DataSource({ rowHasChanged: function rowHasChanged(r1, r2) {
          return r1 !== r2;
        } });
      _this5.state = {
        dataSource: ds.cloneWithRows(['row1', 'row 2', 'row 3'])
      };
      return _this5;
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
    App: App,
    Navigator: Navigator
  }
})
