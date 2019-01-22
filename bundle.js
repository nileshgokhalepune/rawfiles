(function(React, _reactNative, _reactNavigation, styles, createAppContainer, createStackNavigator){
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
          { style: styles.drawer },
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

var AccountSummary = (exports.AccountSummary = (function(_React$Component) {
  _inherits(AccountSummary, _React$Component);

  function AccountSummary(props) {
    _classCallCheck(this, AccountSummary);

    var _this = _possibleConstructorReturn(
      this,
      (AccountSummary.__proto__ || Object.getPrototypeOf(AccountSummary)).call(
        this,
        props
      )
    );

    _this.state = {
      AccountModel: [
        {
          AccountId: 1,
          AccountName: "Super Savings"
        },
        {
          AccountId: 2,
          AccountName: "Checking"
        },
        {
          AccountId: 3,
          AccountName: "Deposits"
        }
      ]
    };
    return _this;
  }

  _createClass(AccountSummary, [
    {
      key: "render",
      value: function render() {
        var accounts = this.state.AccountModel.map(function(account) {
          return React.createElement(
            View,
            null,
            React.createElement(Text, null, "Account Id: ", account.AccountId),
            React.createElement(
              Text,
              null,
              "Account Name: ",
              account.AccountName
            )
          );
        });
        return React.createElement(View, null, accounts);
      }
    }
  ]);

  return AccountSummary;
})(React.Component));

var Navigator = createStackNavigator({
  AccountSummary: { screen: AccountSummary }
});

var NavigatorApp = createAppContainer(Navigator);

  return {
    App: App,
	AccountSummary: AccountSummary,
    Drawer: Drawer,
	Navigator: NavigatorApp
  }
})
