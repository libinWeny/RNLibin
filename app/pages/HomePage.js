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
    { leftText : '录音 播放' },
    { leftText : '调用外部导航', rightText : '调用手机百度，没有则调用H5 ' },
    { leftText : '图片放大查看' },
    { leftText : 'tabPage  Segmented' },
    { leftText : 'TabPage2' },
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
            case '录音 播放':
                navigate('Audio');
                break;
            case '调用外部导航':
                navigate('MapNavigate');
                break;
            case  '图片放大查看':
                navigate('ImageBigLook');
                break;
            case  'tabPage  Segmented':
                navigate('TabPage');
                break;
            case  'TabPage2':
                navigate('TabPage2');
                break;


        }

    };

    render() {
        return (
            <ScrollView style={styles.container}>
                {
                    config.map(item =>
                        <TouchableOpacity style={styles.cell} key={item.leftText} onPress={() => this.cellPress(item)}>
                            <Text style={styles.text}> {item.leftText}</Text>
                            <Text style={styles.right}> {item.rightText}</Text>
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
    headerView : {
        height : 60,
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
    right : {
        fontSize : 12,
        color : '#888888',
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