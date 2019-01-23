(function(React, _reactNative, _reactNavigation, styles, createAppContainer, createSwitchNavigator){
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

 var Drawer = (exports.Drawer = (function(_React$Component) {
  _inherits(Drawer, _React$Component);

  function Drawer() {
    _classCallCheck(this, Drawer);

    return _possibleConstructorReturn(
      this,
      (Drawer.__proto__ || Object.getPrototypeOf(Drawer)).apply(this, arguments)
    );
  }

  _createClass(Drawer, [
    {
      key: "render",
      value: function render() {
        var navigation = this.props.navigation;
        return React.createElement(_reactNative.View, null, null);
      }
    }
  ]);

  return Drawer;
})(React.Component));


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
            _reactNative.View,
            null,
            React.createElement(
              _reactNative.Text,
              null,
              "Account Id: ",
              account.AccountId
            ),
            React.createElement(
              _reactNative.Text,
              null,
              "Account Name: ",
              account.AccountName
            )
          );
        });
        return React.createElement(_reactNative.View, null, accounts);
      }
    }
  ]);

  return AccountSummary;
})(React.Component));

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
