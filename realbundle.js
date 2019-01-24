(function main(React, _reactNative, _nativebase, componentState,createAppContainer, createDrawerNavigator) {
    'use strict';

    var root = this;

    var titleSize = 3.2;
    var grayColor = "#d9d9d9";

    var styles = _reactNative.StyleSheet.create({
        containerStyle: {
            flex: 1,
            backgroundColor: 'transparent',
        },
        viewStyle: {
            marginTop: '20%',
            height: _reactNative.Dimensions.get('window').height / 3,
            flex: 1,
        },
        userNameItem: {
            width: "90%",
            marginLeft: "5%",
            marginRight: "5%",
            marginTop: "5%",
        },
        inputStyle: {
            color: '#2B7B9F',
            paddingLeft: 10,
            fontSize: 24,
            fontWeight: '500',
            width: '100%',
            height: 50,
            borderWidth: 1,
            borderColor: '#ccc',
        },
        passwordItem: {
            width: "90%",
            marginLeft: "5%",
            marginRight: "5%",
            marginTop: "5%",
        },
        passwordlabel: {
            color: '#2B7B9F',
            fontFamily: 'Arial',
            marginBottom: 5,
            fontSize: 22
        },
        userNameLabel: {
            color: '#2B7B9F',
            fontFamily: 'Arial',
            marginBottom: 5,
            fontSize: 22
        },
        loginButton: {
            backgroundColor: '#4568DC',
            marginTop: '5%',
            marginLeft: '5%',
            marginRight: '5%',
            width: '90%',
            textAlign: 'center',
            justifyContent: 'center'
        },
        imageStyle: {
            width: '90%',
            height: 180,
        },
        loginButtonLabel: {
            color: '#FFFFFF',
            fontSize: 20,
            fontFamily: 'Arial',
            textAlign: 'center',
            justifyContent: 'center'

        },
        activityIndicatorWrapper: {
            backgroundColor: '#FFFFFF',
            top: '40%',
            borderRadius: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around'
        }
    });


    function showLoading(localState) {
        localState.setState({ isLoading: true });
    }

    function hideLoading(localState) {
        //console.warn("hide Loading");
        localState.setState({ isLoading: false });
    }

    function loginCall(localState) {
        var userJsonData = {"loginName": localState.state.userName, "password": localState.state.password};
        //console.warn("In Login")
        //console.warn(userJsonData);
        //console.warn("After In Login")

        showLoading(localState);

        componentState.localStorage.getData("LoginData").then(function (result) {
            //console.warn(result);
            var result = JSON.parse(result);
            if (result && result.antiForgeryToken) {
                //console.warn(result);
                hideLoading(localState);
                //const { navigate } = this.props.navigation;
                this.props.navigation.navigate('AccountSummary');
            } else {
                //console.warn("Login");
                fetch("https://cfsfiserv.com/QEUATSMT/api/Authentication/LogIn","POST",
                    {
                     'Content-Type':'application/json',
                    },
                    JSON.stringify(userJsonData)
                ).then(function (loginresult) {

                    //console.warn("Login Result");
                    //console.warn(loginresult);

                    if (!loginresult.antiForgeryToken) {
                        hideLoading(localState);
                        var message = "Invalid username and password"
                        if (loginresult.message) {
                            message = loginresult.message;
                        }
                        _nativebase.Toast.show({
                            text: message,
                            position: 'bottom',
                            buttonText: 'Okay',
                            duration: 5000,
                            type: 'danger'
                        });
                        return false;
                    }

                    localState.setState({
                        antiForgeryToken: loginresult.antiForgeryToken,
                        sessionTimeout: loginresult.sessionTimeout,
                        sessionExpiredText: loginresult.sessionExpiredText
                    }, function () { hideLoading(localState) });

                    loginresult["username"] = localState.state.userName;

                    componentState.localStorage.saveData("LoginData", loginresult).then(function(result1) {
                    });

                    componentState.localStorage.getData("LoginData").then(function(result1) {
                        //console.warn("Get LoginData");
                        //console.warn(result1);
                    });

                    if (loginresult.antiForgeryToken) {
                        navigate('AccountSummary');
                    } else {

                        var message = "Invalid username and password"
                        _nativebase.Toast.show({
                            text: message,
                            position: 'bottom',
                            buttonText: 'Okay',
                            duration: 5000,
                            type: 'danger'
                        });
                    }

                }).catch(function (err) {
                    alert(JSON.stringify(err));
                    alert("In Exception");
                   //hideLoading(localState);
                });
            }
        }).catch(function (err) {
            alert(JSON.stringify(err));
           // hideLoading(localState);
        });


    }


    function validateUser(localState) {
        if (localState.state.userName === '' || localState.state.userName == undefined) {
            _nativebase.Toast.show({
                text: 'Please enter Username',
                position: 'bottom',
                buttonText: 'Okay',
                duration: 5000,
                type: 'danger'
            });
        } else if (localState.state.password === '' || localState.state.password == undefined) {
            _nativebase.Toast.show({
                text: 'Please enter Password',
                position: 'bottom',
                buttonText: 'Okay',
                duration: 5000,
                type: 'danger'
            });
        } else {
            loginCall(localState)
        }
    }

    var NewComponent = function (_React$Component) {
        _inherits(NewComponent, _React$Component);
        function NewComponent(props) {
            _classCallCheck(this, NewComponent);

            var _this = _possibleConstructorReturn(this, (NewComponent.__proto__ || Object.getPrototypeOf(NewComponent)).call(this, props));

            _this.state = {
                userName: "",
                password: "",
                isLoading: false,
            }
            return _this;
        }

        _createClass(NewComponent, [{
            key: 'componentDidMount',
            value: function componentDidMount() {
                //console.warn('New component mounted');
            }
        }, {
            key: 'render',
            value: function render() {
                var _this = this;

                return React.createElement(_nativebase.Container, { style: styles.containerStyle }, [
                    React.createElement(_reactNative.View, {
                        "key": "M_layout_content_PCDZ_MNS7LAN_ctl00_ctl04_field_container",
                        style: styles.viewStyle
                    }, [
                            React.createElement(_reactNative.Image, {
                                "key": "M_layout_content_PCDZ_MNS7LAN_ctl00_ctl0423_Label_container",
                                style: styles.imageStyle,
                                source: { uri: 'https://raw.githubusercontent.com/nagred01/Login/style/logo.png' }
                            }, null),
                            React.createElement(_reactNative.View, {
                                "key": "M_layout_content_PCDZ_MNS7LAN_ctl00_ctl04_Label_container",
                                style: styles.userNameItem
                            }, [
                                    React.createElement(_nativebase.Label, {
                                        "htmlFor": "M_layout_content_PCDZ_MNS7LAN_ctl00_ctl04",
                                        "key": "M_layout_content_PCDZ_MNS7LAN_ctl00_ctl04_Label",
                                        style: styles.userNameLabel
                                    }, ["UserName"]),
                                    React.createElement(_reactNative.TextInput, {
                                        "id": "M_layout_content_PCDZ_MNS7LAN_ctl00_ctl04",
                                        "key": "M_layout_content_PCDZ_MNS7LAN_ctl00_ctl04",
                                        "cssClass": "form-control component-group",
                                        "fieldCssClass": "",
                                        style: styles.inputStyle,
                                        autoCapitalize: 'none',
                                        "bindingMode": "",
                                        onChangeText: function (val) {
                                            _this.setState({ userName: val });
                                        },
                                        placeHolder: "Enter the User Name"
                                    }, [])
                                ]),
                            React.createElement(_reactNative.View, {
                                "key": "M_layout_content_PCDZ_MNS7LAN_ctl00_ctl04_Label_container",
                                style: styles.userNameItem
                            }, [
                                    React.createElement(_nativebase.Label, {
                                        "htmlFor": "M_layout_content_PCDZ_MNS7LAN_ctl00_ctl04",
                                        "key": "M_layout_content_PCDZ_MNS7LAN_ctl00_ctl04_Label",
                                        style: styles.passwordlabel
                                    }, ["Password"]),
                                    React.createElement(_reactNative.TextInput, {
                                        "id": "M_layout_content_PCDZ_MNS7LAN_ctl00_ctl04",
                                        "key": "M_layout_content_PCDZ_MNS7LAN_ctl00_ctl04",
                                        "cssClass": "form-control component-group",
                                        "fieldCssClass": "",
                                        style: styles.inputStyle,
                                        "bindingMode": "",
                                        onChangeText: function (val) {
                                            _this.setState({ password: val })
                                        },
                                        autoCapitalize: 'none',
                                        secureTextEntry: true,
                                        placeHolder: "Enter the Password"
                                    }, [])
                                ]),
                            React.createElement(_nativebase.Button, {
                                "id": "M_layout_content_PCDZ_MNS7LAN_ctl00_btnCancel",
                                "key": "M_layout_content_PCDZ_MNS7LAN_ctl00_btnCancel",
                                style: styles.loginButton,
                                onPress: function () { validateUser(_this) }

                            }, [React.createElement(_reactNative.Text, {
                                "htmlFor": "M_layout_content_PCDZ_MNS7LAN_ctl00_ctl023",
                                "key": "M_layout_content_PCDZ_MNS7LAN_ctl00_ctl023_Label",
                                style: styles.loginButtonLabel,
                            }, ["Login"])])
                        ])
                ])
            }
        }]);

        return NewComponent;
    }(React.Component);

    var MyDrawerNavigator = createDrawerNavigator({
      Login: Login,
      AccountSummary: AccountSummary,
      ChangeUserId: ChangeUserId,
    },
    {
      initialRouteName:'Login'
    });

    var MyApp = createAppContainer(MyDrawerNavigator);

    return {
      App: MyApp
    }
})
