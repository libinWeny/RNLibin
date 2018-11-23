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

export default class EchartsPage2 extends Component {

    static navigationOptions = ({
        headerTitle : '饼状图统计',
    })

    state = {
        searchType:'业务品种',
        good:[16, 9, 9, 12, 8, 7, 17, 8,12,1,11,6],
        bad:[4, 9, 1, 2, 12, 7, 7, 8,2,3,4,6],
        year:''
    }

    render() {
        const option = {
            //点击某一个点的数据的时候，显示出悬浮窗
            tooltip : {
                trigger: 'axis'
            },
            //可以手动选择现实几个图标
            legend: {
                data:['新增','代偿解除','无代偿解除','在保']
            },
            //各种表格
            toolbox: {
                //改变icon的布局朝向
                //orient: 'vertical',
                show : true,
                showTitle:true,
                feature : {
                    //show是否显示表格，readOnly是否只读
                    dataView : {show: false, readOnly: false},
                    magicType : {
                        //折线图  柱形图    总数统计 分开平铺
                        //type: ['line', 'bar','stack','tiled'],
                    },

                }
            },
            yAxis : [
                {
                    type : 'value',
                    name : '笔数'
                }

            ],
            xAxis : [
                {
                    //就是一月份这个显示为一个线段，而不是数轴那种一个点点
                    boundaryGap:true,
                    type : 'category',
                    name : '月份',
                    data : ['周一','周二','周三','周四','周五','周六','周日']
                }
            ],
            //图形的颜色组
            color:['rgb(266,144,216)' ,'rgb(86,144,204)','rgb(246,223,122)','rgb(134,186,65)'],
            //需要显示的图形名称，类型，以及数据设置
            series : [
                {
                    name:'恋爱指数',
                    type:'bar',
                    data:this.state.sum
                },
            ]
        };
        return (
            <View style={styles.container}>
                <Echarts
                    option={option}
                    height={H - 100}
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