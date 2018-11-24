import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Platform
} from 'react-native';

import Echarts from 'native-echarts';

export default class Change extends Component {

    static navigationOptions = ({
        headerTitle : '饼柱切换',
    });

    state = {
        good : [ 16, 9, 9, 12, 8, 7, 17 ],
        bad : [ 4, 9, 1, 2, 12, 7, 7 ],
    }

    render() {
        const option = {
            //点击某一个点的数据的时候，显示出悬浮窗
            tooltip : {
                trigger : 'axis'
            },
            //可以手动选择现实几个图标
            legend : {
                data : [ '爱我', '不爱' ]
            },
            //各种表格
            toolbox : {
                //改变icon的布局朝向
                //orient: 'vertical',
                show : true,
                showTitle : true,
                feature : {
                    //show是否显示表格，readOnly是否只读
                    dataView : { show : true, readOnly : false },
                    magicType : {
                        //折线图  柱形图 总数统计 分开平铺   只能折现和柱状图切换   饼状图数据源类型不同
                        type : [ 'line', 'bar', 'stack', 'tiled' ],
                    },

                }
            },
            xAxis : [
                {
                    //就是一月份这个显示为一个线段，而不是数轴那种一个点点
                    boundaryGap : true,
                    type : 'category',
                    name : '时间',
                    data : [ '周一', '周二', '周三', '周四', '周五', '周六', '周日' ]
                }
            ],
            yAxis : [
                {
                    type : 'value',
                    name : '结果'
                }
            ],
            //图形的颜色组
            color : [ 'rgb(249,159,94)', 'rgb(266,144,216)' ],
            //需要显示的图形名称，类型，以及数据设置
            series : [
                {
                    name : '爱我',
                    //默认显
                    type : 'bar',
                    data : this.state.good
                },
                {
                    name : '不爱',
                    type : 'bar',
                    data : this.state.bad
                }
            ]
        };
        return (
            <View style={styles.container}>
                <Echarts option={option} height={H - 200} width={W}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
    },
});