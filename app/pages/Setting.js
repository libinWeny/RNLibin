'use strict';

import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    ScrollView,
    TouchableOpacity,
    KeyboardAvoidingView,
    TextInput,
    StyleSheet,
} from 'react-native';
import { ActionSheet, Toast } from 'antd-mobile-rn';
import ImagePicker from 'react-native-image-crop-picker';
import Icon from "react-native-vector-icons/FontAwesome";

export default class Setting extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerTitle : '设置',
    });

    state = {
        imgUrl : 'http://file2.rrxh5.cc/g2/c1/2017/09/07/1504777332491.png',
        sex : 1,
    };

    showSelectPhoto = () => {
        ActionSheet.showActionSheetWithOptions({
                options : [ '拍照', '选择相册', '取消' ],
                cancelButtonIndex : 2,
                maskClosable : true,
            },
            (buttonIndex) => {
                if (buttonIndex === 0) {
                    this.openCamera()
                } else if (buttonIndex == 1) {
                    this.openPicker()
                }
            });
    }

    openCamera = () => {
        ImagePicker.openCamera({
            cropping : true,  // 启用或禁用裁剪
            compressImageQuality : 0.5,
            cropperCircleOverlay : true, // 启用或禁用圆形裁剪。
        }).then(image => {
            this.setState({ imgUrl : image.path });
        });
    }

    openPicker = () => {
        ImagePicker.openPicker({
            // multiple: true, 多个
            cropping : true, // 启用或禁用裁剪
            compressImageQuality : 0.5,
            cropperCircleOverlay : true, // 启用或禁用圆形裁剪。
        }).then(image => {
            this.setState({ imgUrl : image.path });
        });
    };

    showSex = () => {
        const BUTTONS = [ '男', '女', '取消' ];
        ActionSheet.showActionSheetWithOptions({
                options : BUTTONS,
                cancelButtonIndex : BUTTONS.length - 1,
                maskClosable : true,
            },
            (buttonIndex) => {
                if (buttonIndex == 0 || buttonIndex == 1) {
                    this.setState({ sex : buttonIndex + 1 });
                }
            });
    };

    save=()=>{
        this.props.navigation.goBack();
    };

    loginOut = () => {
        // storage.remove({ key : 'loginState' });
        this.props.navigation.navigate('LoginPage');
    };

    render() {
        return (
            <ScrollView style={styles.container}>
                <TouchableOpacity style={[ styles.cellView, { paddingRight : 15 } ]} onPress={this.showSelectPhoto}>
                    <Text>头像</Text>
                    <View style={{ flex : 1 }}/>
                    <Image
                        source={{ uri : this.state.imgUrl }}
                        style={styles.imgPhoto}
                    />
                    <Icon name='angle-right' color={CS.ICON}/>
                </TouchableOpacity>

                <View style={styles.cellView}>
                    <Text>名称：</Text>
                    <TextInput
                        style={styles.inputItem}
                        maxLength={8}
                        underlineColorAndroid="transparent"
                        clearButtonMode="while-editing"
                        defaultValue={'文迪'}
                        placeholder='请填写的名称'
                    />
                </View>

                <View style={styles.cellView}>
                    <Text>手机号：</Text>
                    <Text style={{ color : '#999999', fontSize : 14, paddingRight : 15 }}>52013149999</Text>
                </View>

                <TouchableOpacity style={[ styles.cellView, { paddingRight : 15 } ]} onPress={this.showSex}>
                    <Text>性别：</Text>
                    <Text style={styles.contentText}>{this.state.sex == 1 ? '男' : '女'}</Text>
                    <Icon name='angle-right' color={CS.ICON}/>
                </TouchableOpacity>

                <View style={[ styles.cellView, { marginTop : 8 } ]}>
                    <Text>公司名称：</Text>
                    <TextInput
                        style={styles.inputItem}
                        maxLength={20}
                        underlineColorAndroid="transparent"
                        clearButtonMode="while-editing"
                        defaultValue={'爱你爱你爱你公司'}
                        placeholder='请填写的公司名称'
                        onChangeText={company => this.setState({ company })}
                    />
                </View>

                <View style={styles.cellView}>
                    <Text>简介：</Text>
                    <TextInput
                        style={styles.inputItem}
                        maxLength={50}
                        underlineColorAndroid="transparent"
                        clearButtonMode="while-editing"
                        defaultValue={'说点什么吧'}
                        placeholder='说点什么吧'
                        onChangeText={intro => this.setState({ intro })}
                    />
                </View>

                <View style={{ marginVertical : 60, alignItems : 'center' }} >
                    <Text onPress={this.save}>保存修改</Text>
                </View>


                <View style={{ alignItems : 'center' }}>
                    <Text onPress={this.loginOut}>退出登录</Text>
                </View>

            </ScrollView>
        );
    }

}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : CS.BG,
    },
    cellView : {
        paddingLeft : 15,
        backgroundColor : 'white',
        flexDirection : 'row',
        alignItems : 'center',
        marginBottom : 1,
        justifyContent : 'space-between',
        paddingVertical : 12,
    },
    imgPhoto : {
        height : 60,
        width : 60,
        marginRight : 10,
        borderRadius : 30,
    },
    inputItem : {
        fontSize : 16,
        padding : 0,
        flex : 1,
        textAlign : 'right',
        paddingRight : 15

    },
    tipView : {
        marginTop : 10,
        height : 40,
        alignItems : 'center',
        backgroundColor : 'white',
        justifyContent : 'center',
        marginBottom : 1,
    },
    tipText : {
        color : '#888888',
        fontSize : 14,
        textAlign : 'center',
    },
    contentText : {
        color : '#666666',
        fontSize : 16,
        // paddingRight : 15,
        flex : 1,
        textAlign : 'right',

    },

});

