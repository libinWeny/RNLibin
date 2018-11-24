'use strict';

import React, { Component } from 'react';

import {
    PixelRatio,
    ScrollView,
    StyleSheet,
    Text, TouchableOpacity,
    View,
} from 'react-native';
import Echarts from 'native-echarts';

import Icon from "react-native-vector-icons/FontAwesome";

export default class Bar extends Component {

    static navigationOptions = ({
        headerTitle : '折线统计',
    })

    state = {
        data1 : [ 16, 9, 9, 12, 8, 7, 17 ],
        data2 : [ 4, 9, 1, 2, 5, 7, 7 ],
    };

    render() {
        const option = {
            //点击某一个点的数据的时候，显示出悬浮窗
            tooltip : {
                trigger : 'axis'
            },
            //可以手动选择现实几个图标
            legend : {
                data : [ '恋爱指数', '伤心指数' ]
            },
            //各种表格
            toolbox : {
                //改变icon的布局朝向
                //orient: 'vertical',
                show : true,
                showTitle : true,
                feature : {
                    //show是否显示表格，readOnly是否只读
                    dataView : { show : false, readOnly : false },
                    magicType : {
                        //分开平铺    总数统计
                        type : [ 'tiled', 'stack' ],
                    },

                }
            },
            yAxis : [
                {
                    // type : 'value',
                    name : '笔数'
                }

            ],
            xAxis : [
                {
                    //就是一月份这个显示为一个线段，而不是数轴那种一个点点
                    boundaryGap : true,
                    type : 'category',
                    name : '时间',
                    data : [ '周一', '周二', '周三', '周四', '周五', '周六', '周日' ]
                }
            ],
            //图形的颜色组
            color : [ 'rgb(191,85,53)', 'rgb(86,144,204)' ],
            //需要显示的图形名称，类型，以及数据设置
            series : [
                {
                    name : '恋爱指数',
                    type : 'line',
                    data : this.state.data1,
                },
                {
                    name : '伤心指数',
                    type : 'line',
                    data : this.state.data2,
                },
            ]
        };
        return (
            <View style={styles.container}>
                <Echarts
                    option={option}
                    height={H - 200}
                    width={W}
                />
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container : {
        flex : 1,
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