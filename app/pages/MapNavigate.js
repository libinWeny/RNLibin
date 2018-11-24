'use strict';

import React, { Component } from 'react';

import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Platform,
    Linking
} from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";



const MapUtils = {
    /**
     * 跳转到导航界面
     * @param lon
     * @param lat
     * @param name
     * @param targetAppName browser-浏览器打开 baidu-百度APP，如果没有安装相应APP则使用浏览器打开。
     */
    turn2MapApp(lon = 0, lat = 0, name = '目标地址'){
        console.log(lon,lat)
        if (0 == lat && 0 == lon) {
            console.warn('暂时不能导航');
            return;
        }

        let url = '';
        let webUrl = '';
        let webUrlBaidu = `http://api.map.baidu.com/direction?destination=latlng:${lat},${lon}|name=${name}&mode=transit&coord_type=gcj02&output=html&src=mybaoxiu|wxy`;

        if (Platform.OS == 'android') {//android
            url = `baidumap://map/direction?destination=name:${name}|latlng:${lat},${lon}&mode=transit&coord_type=gcj02&src=thirdapp.navi.mybaoxiu.wxy#Intent;scheme=bdapp;package=com.baidu.BaiduMap;end`;
            webUrl = webUrlBaidu;
        } else if (Platform.OS == 'ios') {//ios
            url = `baidumap://map/direction?destination=name:${name}|latlng:${lat},${lon}&mode=transit&coord_type=gcj02&src=thirdapp.navi.mybaoxiu.wxy#Intent;scheme=bdapp;package=com.baidu.BaiduMap;end`;
            webUrl = webUrlBaidu;
        }

        Linking.canOpenURL(url).then(supported => {
            if (!supported) {
                console.log('Can\'t handle url: ' + url);
                return Linking.openURL(webUrl).catch(e => console.warn(e));
            } else {
                return Linking.openURL(url).catch(e => console.warn(e));
            }
        }).catch(err => console.error('An error occurred', err));
    },


};


export default class MapNavigate extends Component {
    static navigationOptions = {
        headerTitle : '导航',
    };



    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => MapUtils.turn2MapApp("109.547094", "18.303645", "地名：your heart")}
                >
                    <Icon name='map-marker' color={'#16ff52'} size={30}/>
                    <Text>导航 gogogo</Text>
                </TouchableOpacity>
            </View>
        );
    }



}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent : 'center',
        alignItems : 'center',
    },
    btn: {
        justifyContent : 'center',
        alignItems : 'center',
    },
});