(function main(React, _reactNative, _nativebase, reactNavigation, styles, createAppContainer, createDrawerNavigator) {
	'use strict';

	var LoginModule = (exports.LoginModule = (function (_React$Component) {
			_inherits(LoginModule, _React$Component);

			function LoginModule(props) {
				_classCallCheck(this, LoginModule);

				var _this = _possibleConstructorReturn(
						this,
						(LoginModule.__proto__ || Object.getPrototypeOf(LoginModule)).call(
							this,
							props));

				_this.login = function () {
					var userJsonData = {
						loginName: _this.state.userName,
						password: _this.state.password
					};
					console.log("Fetching....");
					fetch("http://cfsfiserv.com/QEUATSMT/api/Authentication/Login", {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify(userJsonData)
					})
					.then(function (response) {
						console.log(response);
						var responseObj = JSON.parse(response._bodyText);
						var TokenResponse = responseObj.antiForgeryToken;

						if (TokenResponse == "" || TokenResponse == undefined) {
							console.log("Invalid response");
							_nativeBase.Toast.show({
								text: "Please enter the valid UserName and Password",
								position: "bottom",
								buttonText: "Okay",
								duration: 5000,
								type: "danger"
							});
						} else {
							console.log(TokenResponse);
							_this.props.navigation.navigate("AccountSummary", {
								token: TokenResponse
							});
						}
					})
					.catch(function (ex) {
						console.log(ex);
					});
				};

				_this.validateUser = function () {
					if (_this.state.userName === "" || _this.state.userName == undefined) {
						_nativeBase.Toast.show({
							text: "Please enter Username",
							position: "bottom",
							buttonText: "Okay",
							duration: 5000,
							type: "danger"
						});
					} else if (
						_this.state.password === "" ||
						_this.state.password == undefined) {
						_nativeBase.Toast.show({
							text: "Please enter Password",
							position: "bottom",
							buttonText: "Okay",
							duration: 5000,
							type: "danger"
						});
					} else {
						_this.login();
					}
				};

				_this.state = {
					userName: "uatbususr01",
					password: "Fsv#2016"
				};
				return _this;
			}

			_createClass(LoginModule, [{
						key: "render",
						value: function render() {
							return React.createElement(
								_nativeBase.Container, {
								style: styles.containerStyle
							},
								React.createElement(
									_reactNative.View, {
									style: styles.viewStyle
								},
									React.createElement(_reactNative.Image, {
										style: styles.imageStyle,
										source: {
											uri:
											"https://raw.githubusercontent.com/nagred01/Login/style/logo.png"
										}
									}),
									React.createElement(
										_reactNative.View, {
										style: styles.userNameItem
									},
										React.createElement(_nativeBase.Label, null, "Username"),
										React.createElement(_reactNative.TextInput, {
											style: styles.inputStyle,
											placeholder: "Enter the Username",
											onChangeText: function onChangeText(val) {
												//this.setState({ userName: val });
											}
										})),
									React.createElement(
										_reactNative.View, {
										style: styles.userNameItem
									},
										React.createElement(_nativeBase.Label, null, "Password"),
										React.createElement(_reactNative.TextInput, {
											style: styles.inputStyle,
											placeholder: "Enter the password",
											onChangeText: function onChangeText(val) {
												//this.setState({ password: val });
											}
										}))),
								React.createElement(
									_reactNative.View,
									null,
									React.createElement(_reactNative.Button, {
										style: styles.loginButton,
										title: "Login",
										onPress: this.validateUser
									})));
						}
					}
				]);

			return LoginModule;
		})(React.Component));

	var AccountSummaryModule = (exports.AccountSummaryModule = (function (
				_React$Component2) {
			_inherits(AccountSummaryModule, _React$Component2);

			function AccountSummaryModule(props) {
				_classCallCheck(this, AccountSummaryModule);

				var _this2 = _possibleConstructorReturn(
						this,
						(
							AccountSummaryModule.__proto__ ||
							Object.getPrototypeOf(AccountSummaryModule)).call(this, props));

				_this2.shouldRenderModule = false;

				_this2.resetSearch = function () {};

				_this2.toggleSearch = function () {
					var searchButtonId = _this2.props.config.searchButtonId;

					if (_this2.state.accountSummaryModel.searchVisible) {
						_this2.resetSearch();
					}
				};

				_this2.selectAccount = function (e) {
					_this2.setState(function (prevState) {
						return {
							model: prevState.model,
							accountSelected: true
						};
					});
					var searchButtonId = _this2.props.config.searchButtonId;
					_this2.resetSearch();
				};

				_this2.handleModelChange = function ($spec) {};

				_this2.state = {
					accountSummaryModel: _this2.createAccountSummaryModel(
						_this2.props.config.accounts,
						[],
						_this2.props.config.accountTypes),
					accountSelected: false
				};
				return _this2;
			}

			_createClass(AccountSummaryModule, [{
						key: "componentDidUpdate",
						value: function componentDidUpdate() {
							var module = "#" + this.props.config.moduleId;
						}
					}, {
						key: "componentDidMount",
						value: function componentDidMount() {}
					}, {
						key: "createAccountSummaryModel",
						value: function createAccountSummaryModel(
							accounts,
							safeDepositBoxes,
							accountTypes) {
							var accountSummary = new AccountSummaryModel(
									accounts.map(function (account) {
										return new AccountModel(account);
									}),
									(safeDepositBoxes = []),
									accountTypes.map(function (accountType) {
										return new AccountTypeModel(accountType);
									}));
							accountSummary.selectedAccountTypeId = "";
							accountSummary.searchString = "";

							return accountSummary;
						}
					}, {
						key: "render",
						value: function render() {
							return React.createElement(
								_reactNative.View,
								null,
								React.createElement(_reactNative.Text, null, "Inside Account Summary"));
						}
					}
				]);

			return AccountSummaryModule;
		})(React.Component));

	var MyDrawerNavigator = (0, _reactNavigation.createDrawerNavigator)({
		Login: LoginModule,
		AccountSummary: AccountSummaryModule
	}, {
		initialRouteName: "Login"
	});

	var MyApp = (0, _reactNavigation.createAppContainer)(MyDrawerNavigator);

	return {
		App: MyApp
	}
})
