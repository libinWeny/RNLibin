'use strict';

import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    KeyboardAvoidingView,
    ScrollView,
    StyleSheet,
    TextInput,
    ImageBackground, NetInfo,
    ActivityIndicator,
} from 'react-native';

import { Toast } from 'teaset'

export default class LoginPage extends Component {
    static navigationOptions = {
        header : null,
    };

    static customKey = null;


    state = {
        account : null,
        password : null,
    };

    componentWillUnmount() {
        this.interval && clearInterval(this.interval);
    }

    fetchLogin = () => {
        const { account, password } = this.state;
        if (account === 'libin' && password === 'libin') {
            if (LoginPage.customKey) {
                return;
            }
            LoginPage.customKey = Toast.show({
                text : '登录中...',
                icon : <ActivityIndicator size='large' color={'#E2C3D1'}/>,
                // position : 'top',
                duration : 1000000,
            });
            this.interval = setTimeout(() => {
                if (!LoginPage.customKey) return;
                Toast.hide(LoginPage.customKey);
                LoginPage.customKey = null;
                this.props.navigation.navigate('Tab')
            }, 2000);
        } else {
            Toast.fail('账号密码错误');
        }
    };

    render() {
        const { account, password } = this.state;
        return (
            <ImageBackground source={require('../image/loginBG.jpg')} style={styles.container}>
                <ScrollView
                    style={styles.container}
                    keyboardShouldPersistTaps={'always'}
                >

                    <KeyboardAvoidingView behavior='position'>
                        <View style={styles.center}>
                            <View style={styles.cellView}>
                                <Text style={styles.text}>名称：</Text>
                                <TextInput
                                    style={styles.textInput}
                                    maxLength={5}
                                    autoCapitalize="none"
                                    underlineColorAndroid="transparent"
                                    clearButtonMode="while-editing"
                                    value={account}
                                    placeholder='账号libin'
                                    onChangeText={account => this.setState({ account })}
                                />
                            </View>

                            <View style={styles.cellView}>
                                <Text style={styles.text}>名称：</Text>
                                <TextInput
                                    autoCapitalize="none"
                                    style={styles.textInput}
                                    maxLength={5}
                                    underlineColorAndroid="transparent"
                                    clearButtonMode="while-editing"
                                    value={password}
                                    placeholder='密码libin'
                                    onChangeText={password => this.setState({ password })}
                                />
                            </View>

                            <TouchableOpacity
                                disabled={!(account && password)}
                                style={[ styles.okButton, account && password && { backgroundColor : CS.MAIN } ]}
                                onPress={this.fetchLogin}
                            >
                                <Text style={{ fontSize : 15, color : '#FFF' }}>立即登录</Text>
                            </TouchableOpacity>

                            <Text style={styles.registerText}>立即注册</Text>

                        </View>
                    </KeyboardAvoidingView>
                </ScrollView>
            </ImageBackground>
        );
    }
};

const styles = StyleSheet.create({
    container : {
        flex : 1,
    },
    logo : {
        width : W - 100,
        height : 80,
        marginTop : 100,
    },
    center : {
        marginTop : 200,
    },
    cellView : {
        flexDirection : 'row',
        alignItems : 'center',
        height : 50,
        marginHorizontal : 30,
    },
    text : {
        color : CS.MAIN,
        fontSize : 16,
    },
    textInput : {
        flex : 1,
        borderBottomColor : CS.MAIN,
        borderBottomWidth : 0.5,
        padding : 4,
        color : CS.MAIN,
    },
    okButton : {
        backgroundColor : '#E2C3D1',
        height : 44,
        marginHorizontal : 50,
        borderRadius : 22,
        justifyContent : 'center',
        alignItems : 'center',
        marginTop : 50,
    },
    registerText : {
        marginTop : 30,
        fontSize : 15,
        color : CS.MAIN,
        alignSelf : 'center',
    }
});




