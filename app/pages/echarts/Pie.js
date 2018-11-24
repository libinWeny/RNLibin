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

export default class Pie extends Component {

    static navigationOptions = ({
        headerTitle : '饼状图统计',
    })

    render() {
        const option = {
            //图形的颜色组
            color : [ 'rgb(191,85,53)', 'rgb(86,144,204)', 'rgb(266,144,216)' ],
            tooltip : {
                trigger : 'item',
                formatter : "{a} <br/>{b}: {c} ({d}%)"
            },
            // 可以手动选择现实几个图标
            legend : {
                // 改变icon的布局朝向
                orient : 'vertical',
                x : 'left',
                data : [ '我爱你', '你爱我', '我们都爱' ]
            },
            series : [
                {
                    name : '统计单位：恋爱能量',
                    type : 'pie',
                    radius : [ '50%', '70%' ],
                    avoidLabelOverlap : false,
                    label : {
                        normal : {
                            show : false,
                            position : 'center'
                        },
                        emphasis : {
                            show : true,
                            textStyle : {
                                fontSize : '30',
                                fontWeight : 'bold'
                            }
                        }
                    },
                    labelLine : {
                        normal : {
                            show : false
                        }
                    },
                    data : [
                        { value : 335, name : '我爱你' },
                        { value : 310, name : '你爱我' },
                        { value : 234, name : '我们都爱' }
                    ]
                }
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