(function(React, _reactNative, _reactNavigation, styles, createAppContainer, createSwitchNavigator){

  var Drawer = exports.Drawer = function (_React$Component) {
    _inherits(Drawer, _React$Component);

    function Drawer() {
      _classCallCheck(this, Drawer);

      return _possibleConstructorReturn(this, (Drawer.__proto__ || Object.getPrototypeOf(Drawer)).apply(this, arguments));
    }

    _createClass(Drawer, [{
      key: 'render',
      value: function render() {
        var nav = Object.keys(this.props).map(function (key) {
          return React.createElement(
            _reactNative.Text,
            null,
            key
          );
        });
        return React.createElement(
          _reactNative.View,
          null,
          nav
        );
      }
    }]);

    return Drawer;
  }(React.Component);

  var App = exports.App = function (_React$Component2) {
    _inherits(App, _React$Component2);

    function App() {
      _classCallCheck(this, App);

      return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));
    }

    _createClass(App, [{
      key: 'render',
      value: function render() {
        return React.createElement(
          _reactNative.View,
          null,
          React.createElement(
            _reactNative.Text,
            null,
            'Main Page'
          )
        );
      }
    }]);

    return App;
  }(React.Component);

  var AccountSummary = exports.AccountSummary = function (_React$Component3) {
    _inherits(AccountSummary, _React$Component3);

    function AccountSummary(props) {
      _classCallCheck(this, AccountSummary);

      var _this3 = _possibleConstructorReturn(this, (AccountSummary.__proto__ || Object.getPrototypeOf(AccountSummary)).call(this, props));

      _this3.state = {
        AccoutModel: [{
          AccountId: 1,
          AccountName: "Super Savings"
        }, {
          AccountId: 2,
          AccountName: "Checking"
        }, {
          AccountId: 3,
          AccountName: "Deposits"
        }]
      };
      return _this3;
    }

    _createClass(AccountSummary, [{
      key: 'render',
      value: function render() {
        var accounts = this.state.AccountModel.map(function (account) {
          return React.createElement(
            _reactNative.View,
            null,
            React.createElement(
              _reactNative.Text,
              null,
              'AccountId : ',
              account.AccountId
            ),
            React.createElement(
              _reactNative.Text,
              null,
              'AccountName: ',
              account.AccountName
            )
          );
        });
        return React.createElement(
          _reactNative.View,
          null,
          accounts
        );
      }
    }]);

    return AccountSummary;
  }(React.Component);

var Navigator = createSwitchNavigator(
  {
    AccountSummary: { screen: AccountSummary },
	Drawer: {screen: Drawer}
  },
  {
    initialRouteName: 'AccountSummary'
  }
);

var NavigatorApp = createAppContainer(Navigator);

  return {
    App: App,
	  AccountSummary: AccountSummary,
    Drawer: Drawer,
	  Navigator: NavigatorApp
  }
})
