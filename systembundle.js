(function (System) {
	"use strict";

	System.register(

		[
			"react",
			"IDS.Banking.Web/Models/AccountModel",
			"IDS.Banking.Web/Models/AccountTypeModel",
			"IDS.Banking.Retail.Web/Views/AccountSummaryModel",
			"immutability-helper"
		],
		function (_export, _context) {
		"use strict";

		var React,
		AccountModel,
		AccountTypeModel,
		AccountSummaryModel,
		update,
		Spec,
		_createClass,
		AccountSummary;

		function _classCallCheck(instance, Constructor) {
			if (!(instance instanceof Constructor)) {
				throw new TypeError("Cannot call a class as a function");
			}
		}

		function _possibleConstructorReturn(self, call) {
			if (!self) {
				throw new ReferenceError(
					"this hasn't been initialised - super() hasn't been called");
			}

			return call && (typeof call === "object" || typeof call === "function")
			 ? call
			 : self;
		}

		function _inherits(subClass, superClass) {
			if (typeof superClass !== "function" && superClass !== null) {
				throw new TypeError(
					"Super expression must either be null or a function, not " +
					typeof superClass);
			}

			subClass.prototype = Object.create(superClass && superClass.prototype, {
					constructor: {
						value: subClass,
						enumerable: false,
						writable: true,
						configurable: true
					}
				});
			if (superClass)
				Object.setPrototypeOf
				 ? Object.setPrototypeOf(subClass, superClass)
				 : (subClass.__proto__ = superClass);
		}

		return {
			setters: [
				function (_react) {
					React = _react;
				},
				function (_IDSBankingWebModelsAccountModel) {
					AccountModel = _IDSBankingWebModelsAccountModel.AccountModel;
				},
				function (_IDSBankingWebModelsAccountTypeModel) {
					AccountTypeModel =
						_IDSBankingWebModelsAccountTypeModel.AccountTypeModel;
				},
				function (_IDSBankingRetailWebViewsAccountSummaryModel) {
					AccountSummaryModel =
						_IDSBankingRetailWebViewsAccountSummaryModel.AccountSummaryModel;
				},
				function (_immutabilityHelper) {
					update = _immutabilityHelper.default;
					Spec = _immutabilityHelper.Spec;
				}
			],
			execute: function () {
				_createClass = (function () {
					function defineProperties(target, props) {
						for (var i = 0; i < props.length; i++) {
							var descriptor = props[i];
							descriptor.enumerable = descriptor.enumerable || false;
							descriptor.configurable = true;
							if ("value" in descriptor)
								descriptor.writable = true;
							Object.defineProperty(target, descriptor.key, descriptor);
						}
					}

					return function (Constructor, protoProps, staticProps) {
						if (protoProps)
							defineProperties(Constructor.prototype, protoProps);
						if (staticProps)
							defineProperties(Constructor, staticProps);
						return Constructor;
					};
				})();

				AccountSummary = (function (_React$Component) {
					_inherits(AccountSummary, _React$Component);

					function AccountSummary(props) {
						_classCallCheck(this, AccountSummary);

						var _this = _possibleConstructorReturn(
								this,
								(
									AccountSummary.__proto__ ||
									Object.getPrototypeOf(AccountSummary)).call(this, props));

						_this.resetSearch = function () {
							_this.setState({
								accountSummaryModel: update(_this.state.accountSummaryModel, {
									searchVisible: {
										$set: false
									},
									searchString: {
										$set: ""
									},
									selectedAccountTypeId: {
										$set: ""
									}
								})
							});
						};

						_this.toggleSearch = function () {
							var searchButtonId = _this.props.config.searchButtonId;
							$("#" + searchButtonId).toggleClass("search-button-closed");
							$("#" + searchButtonId).toggleClass("search-button-opened");
							$("#" + searchButtonId).blur();

							if (_this.state.accountSummaryModel.searchVisible) {
								_this.resetSearch();
							} else {
								_this.setState({
									accountSummaryModel: update(_this.state.accountSummaryModel, {
										searchVisible: {
											$set: true
										}
									})
								});
							}
						};

						_this.selectAccount = function (e) {
							_this.setState(function (prevState) {
								return {
									model: prevState.model,
									accountSelected: true
								};
							});
							MessageBus.publish("AccountSelected", e);
							var searchButtonId = _this.props.config.searchButtonId;
							$("#" + searchButtonId)
							.addClass("search-button-closed")
							.removeClass("search-button-opened");
							_this.resetSearch();
						};

						_this.handleModelChange = function ($spec) {
							_this.setState({
								accountSummaryModel: update(
									_this.state.accountSummaryModel,
									$spec)
							});
						};

						_this.state = {
							accountSummaryModel: _this.createAccountSummaryModel(
								_this.props.config.accounts,
								[],
								_this.props.config.accountTypes),
							accountSelected: false
						};
						return _this;
					}

					_createClass(AccountSummary, [{
								key: "componentDidUpdate",
								value: function componentDidUpdate() {
									var module = "#" + this.props.config.moduleId;
									$(module).toggle(!this.state.accountSelected);
								}
							}, {
								key: "componentDidMount",
								value: function componentDidMount() {
									var _this2 = this;

									MessageBus.subscribe("ShowAccounts", function () {
										_this2.setState({
											accountSelected: false
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
							}
						]);

					return AccountSummary;
				})(React.Component);

				_export("default", AccountSummary);
			}
		};
	});

})
