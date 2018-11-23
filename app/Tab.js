'use strict';

import React, { Component } from 'react';

import {
    Text,
    View,
    Image,
    Platform
} from 'react-native';
import HomePage from './pages/home/HomePage'
import MePage from './pages/me/MePage'
import { createBottomTabNavigator } from 'react-navigation';
import TabBarItem from "./TabBarItem";
import AddNullPage from "./pages/AddNullPage";


const Tab = createBottomTabNavigator({
    HomePage : {
        screen : HomePage,
        path : 'app/ScreenHome',
        navigationOptions : {
            tabBarLabel : '首页',
            tabBarIcon : ({ focused }) => (
                <TabBarItem
                    tabBarIconName={'home'}
                    focused={focused}
                />
            ),
        }
    },

    AddNullPage : {
        screen : AddNullPage,
        path : 'app/ScreenAdd',
        navigationOptions : {
            tabBarLabel : '发布',
            tabBarIcon : ({ focused }) => (
                <TabBarItem
                    tabBarIconName={'plus-circle'}
                    focused={focused}
                />
            ),
            tabBarOnPress : ({ navigation }) => navigation.navigate('AddPage')
        }

    },
    MePage : {
        screen : MePage,
        path : 'app/ScreenMe',
        navigationOptions : {
            tabBarLabel : '我的',
            tabBarIcon : ({ focused }) => (
                <TabBarItem
                    tabBarIconName={'user'}
                    focused={focused}
                />
            ),
        }
    },
}, {
    tabBarPosition : 'bottom',
    swipeEnabled : false, // 是否允许在标签之间进行滑动。
    animationEnabled : false, // 是否在更改标签时显示动画。
    initialRouteName : 'HomePage',
    backBehavior : 'none', // 按 back 键是否跳转到第一个Tab(首页)
    lazy : true, // 据需要懒惰呈现标签
    tabBarOptions : {
        //选中时候字体的颜色
        activeTintColor : CS.MAIN,
        //未选中时候字体的颜色
        inactiveTintColor : '#555555',
        //去掉android的下划线
        indicatorStyle : { height : 0 },
        activeBackgroundColor : 'white',
        inactiveBackgroundColor : 'white',
        showIcon : true,
        //整个背景颜色

    },
});

Tab.navigationOptions = ({ navigation }) => {
    return {
        header : null,
    };
};

export default Tab;