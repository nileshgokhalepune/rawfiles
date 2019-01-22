
(function(React, _reactNative, _reactNavigation){
  var App = function (_React$Component3) {
  _inherits(App, _React$Component3);

  function App(props) {
    _classCallCheck(this, App);

    var _this3 = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

    _this3.state = {
      showDrawer: false
    };
    return _this3;
  }

  _createClass(App, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        _reactNative.View,
        null,
        React.createElement(
          _reactNative.View,
          null,
          React.createElement(
            _reactNative.Text,
            null,
            'Main page'
          )
        )
      );
    }
  }]);

  return App;
}(React.Component);

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
          { style: { position:'absolute', top:0, bottom:0, left:'50%', right:0 } },
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
    Drawer: Drawer
  }
})
