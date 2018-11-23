'use strict';

import React, { Component } from 'react';
import { Dimensions, PixelRatio, Platform } from 'react-native';

import * as CS from '../constants/color';

// 通过系统API获得屏幕宽高
const { height, width } = Dimensions.get('window');



// 系统是iOS
global.iOS = (Platform.OS === 'ios');
// 系统是安卓
global.Android = (Platform.OS === 'android');
// 获取屏幕宽度
global.W = width;
// 获取屏幕高度
global.H = height;
// 获取屏幕分辨率
global.PixelRatio = PixelRatio.get();
// 最小线宽
global.pixel = 1 / PixelRatio;

// 公用样式 颜色 样式  大小
global.CS = CS;

// 用户唯一标识符
global.token = null;






