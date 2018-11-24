'use strict';

import React, { Component } from 'react';

import {
    Alert,
    PixelRatio,
    ScrollView,
    StyleSheet,
    Text, TouchableOpacity,
    View,
} from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";

const config = [
    { leftText : '统计图表' },
    { leftText : '滑动出现头部' },
    { leftText : '意见反馈' },
    { leftText : '账号安全' },
    { leftText : '密码修改' },
    { leftText : '检查更新', rightText : '1.4.4' },
];
export default class HomePage extends Component {

    //  getAllWithoutPhotos     getAll
    componentDidMount() {

    }

    cellPress = (item) => {
        const { navigate } = this.props.navigation;
        switch (item.leftText) {
            case '统计图表':
                navigate('Echarts');
                break;
            case '滑动出现头部':
                navigate('ColorHeader');
                break;
            case '意见反馈':
                navigate('MyIdea');
                break;
            case '帮助指南':
                navigate('HelpPage');
                break;
            case '检查更新':
                Alert.alert(
                    '',
                    '您的认证还没有完成呢',
                    [
                        { text : '取消', onPress : () => console.log('取消') },
                        { text : '前往', onPress : () => navigate('CertificationSelect') },
                    ],
                    { cancelable : false }
                )
                break;
        }

    };

    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={styles.headerView} onPress={() => this.cellPress(item)}>
                    <Text>各种功能组件的使用</Text>
                </View>
                {
                    config.map(item =>
                        <TouchableOpacity style={styles.cell} key={item.leftText} onPress={() => this.cellPress(item)}>
                            <Text style={styles.text}> {item.leftText}</Text>
                            <Text style={styles.version}> {item.rightText}</Text>
                            <Icon name='angle-right' color={CS.ICON}/>
                        </TouchableOpacity>
                    )
                }
            </ScrollView>
        );
    }

}

const styles = StyleSheet.create({
    container : {
        flex : 1,
    },
    headerView:{
        height:60,
        alignItems : 'center',
        justifyContent : 'center',

    },
    cell : {
        backgroundColor : 'white',
        height : 44,
        flexDirection : 'row',
        borderBottomWidth : 1 / PixelRatio.get(),
        borderBottomColor : '#cccccc',
        justifyContent : 'space-between',
        alignItems : 'center',
        paddingHorizontal : 15,

    },
    img : {
        width : 22,
        height : 22,
    },
    text : {
        fontSize : 16,
        color : '#333333',
        textAlign : 'left',
        flex : 1,
    },
    cellImgBack : {
        width : 6,
        height : 12,
        position : 'absolute',
        right : 15,
    },
});