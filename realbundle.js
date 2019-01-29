(function main(React, _reactNative, _nativebase, reactNavigation, styles, createAppContainer, createDrawerNavigator, apiBase, AsyncStorage) {
	'use strict';

	function _asyncToGenerator(fn) {
		return function () {
			var gen = fn.apply(this, arguments);
			return new Promise(function (resolve, reject) {
				function step(key, arg) {
					try {
						var info = gen[key](arg);
						var value = info.value;
					} catch (error) {
						reject(error);
						return;
					}
					if (info.done) {
						resolve(value);
					} else {
						return Promise.resolve(value).then(
							function (value) {
							step("next", value);
						},
							function (err) {
							step("throw", err);
						});
					}
				}
				return step("next");
			});
		};
	}

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
					fetch(apiBase + "/api/Authentication/Login", {
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
						_this.storeData(responseObj.antiForgeryToken);
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

				_this.storeData = (function () {
					var _ref = _asyncToGenerator(
							/*#__PURE__*/
							regeneratorRuntime.mark(function _callee(token) {
								return regeneratorRuntime.wrap(
									function _callee$(_context) {
									while (1) {
										switch ((_context.prev = _context.next)) {
										case 0:
											_context.prev = 0;
											_context.next = 3;
											return _reactNative.AsyncStorage.setItem(
												"X_CSRF_TOKEN",
												token);

										case 3:
											_context.next = 8;
											break;

										case 5:
											_context.prev = 5;
											_context.t0 = _context["catch"](0);

											console.log("error saving data");

										case 8:
										case "end":
											return _context.stop();
										}
									}
								},
									_callee,
									_this2,
									[[0, 5]]);
							}));

					return function (_x) {
						return _ref.apply(this, arguments);
					};
				})();

				_this.state = {};
				return _this;
			}

			_createClass(LoginModule, [{
						key: "render",
						value: function render() {
							var _this2 = this;
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
												_this2.setState({
													userName: val
												});
											},
											value: this.state.userName
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
												_this2.setState({
													password: val
												});
											},
											value: this.state.password
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
				_this2.state = {};
				_this2.shouldRenderModule = false;
				_this2.getToken = _asyncToGenerator(
						/*#__PURE__*/
						regeneratorRuntime.mark(function _callee2() {
							var value;
							return regeneratorRuntime.wrap(
								function _callee2$(_context2) {
								while (1) {
									switch ((_context2.prev = _context2.next)) {
									case 0:
										_context2.prev = 0;
										_context2.next = 3;
										return _reactNative.AsyncStorage.getItem("X_CSRF_TOKEN");

									case 3:
										value = _context2.sent;
										return _context2.abrupt("return", value);

									case 7:
										_context2.prev = 7;
										_context2.t0 = _context2["catch"](0);

										console.log("error getting data");

									case 10:
									case "end":
										return _context2.stop();
									}
								}
							},
								_callee2,
								_this2,
								[[0, 7]]);
						}));

				_this2.resetSearch = function () {};

				_this2.toggleSearch = function () {
					var searchButtonId = _this2.props.config.searchButtonId;

					if (
						_this2.state.accountSummaryModel &&
						_this2.state.accountSummaryModel.searchVisible) {
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
					var searchButtonId = _this2.props.config
						 ? _this2.props.config.searchButtonId
						 : "";
					_this2.resetSearch();
				};

				_this2.handleModelChange = function ($spec) {};

				if (_this2.props.config) {
					_this2.state = {
						accountSummaryModel: _this2.createAccountSummaryModel(
							_this2.props.config.accounts,
							[],
							_this2.props.config.accountTypes),
						accountSelected: false
					};
				}
				return _this2;
			}

			_createClass(AccountSummaryModule, [{
						key: "componentDidUpdate",
						value: function componentDidUpdate() {
							var module =
								"#" + this.props.config ? this.props.config.moduleId : "nomoduleid";
						}
					}, {
						key: "componentDidMount",
						value: function componentDidMount() {
							var _this4 = this;

							fetch(apiBase + "/api/", {})
							.then(function (response) {
								return response.json();
							})
							.then(function (data) {
								var headers = {
									"X-CSRF-TOKEN":  _this4.getToken(),
									"X-Request-Token": data.getAccountsAt.token
								};
								fetch(apiBase + data.getAccountsAt.url, {
									method: data.getAccountsAt.method
								})
								.then(function (accRes) {
									return accRes.json();
								})
								.then(function (data) {
									_this4.setState({
										data
									});
								});
							});

						}
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
							var accounts = this.state && this.state.Accounts ? this.state.Accounts.map(function (account) {
				        return React.createElement(
				          _reactNative.View,
				          null,
				          React.createElement(
				            _reactNative.Text,
				            null,
				            'AccountId: ',
				            account.AccountId
				          ),
				          React.createElement(
				            _reactNative.Text,
				            null,
				            'AccountName: ',
				            account.AccountName
				          )
				        );
				      }) : null;
				      return React.createElement(
				        _reactNative.View,
				        null,
				        accounts
				      );						}
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
