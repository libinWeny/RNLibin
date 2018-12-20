'use strict';

import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    SafeAreaView, Image,
    ScrollView, StyleSheet,
} from 'react-native';

import { SegmentedControl, Tabs } from 'antd-mobile-rn';

export default class TabPage2 extends Component {

    static navigationOptions = ({
        headerTitle : 'tab'
    })

    state = {
        index : 1,
    };


    render() {
        const tabs = [
            { title : '消息1' },
            { title : '消息2' },
            { title : '消息3' },
        ];
        return (
            <View style={styles.container}>
                <Tabs
                    tabs={tabs}
                    key={tabs.title}
                    // 预加载两侧Tab数量
                    // prerenderingSiblingsNumber={1}
                    // 初始化Tab, index or key
                    initialPage={this.state.index}
                    // tabBar下划线样式
                    // tabBarUnderlineStyle={{ backgroundColor : '#FF6500' }}
                >
                    <View style={styles.page1}/>
                    <View style={styles.page2}/>
                    <View style={styles.page3}/>
                </Tabs>
            </View>
        );

    }

}

const styles = StyleSheet.create({
    container : {
        flex : 1,
    },
    headerView : {
        height : 64,
    },
    segmentedControl : {
        alignSelf : 'center',
        width : W / 3,
        marginTop : 28,
    },
    page1 : {
        width : W,
        height : H,
        backgroundColor : "pink"
    },
    page2 : {
        width : W,
        height : H,
        backgroundColor : 'yellow'
    },
    page3 : {
        width : W,
        height : H,
        backgroundColor : 'red'
    },
});