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

export default class index extends Component {
    static navigationOptions = ({
        headerTitle : '统计图表',
    });

    //  getAllWithoutPhotos     getAll
    componentDidMount() {

    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.cell} onPress={() => navigate('Pie')}>
                    <Text style={styles.version}> 饼状图</Text>
                    <Icon name='angle-right' color={CS.ICON}/>
                </TouchableOpacity>

                <TouchableOpacity style={styles.cell} onPress={() => navigate('Bar')}>
                    <Text style={styles.version}> 柱状图</Text>
                    <Icon name='angle-right' color={CS.ICON}/>
                </TouchableOpacity>

                <TouchableOpacity style={styles.cell}  onPress={() => navigate('Line')}>
                    <Text style={styles.version}> 折线图</Text>
                    <Icon name='angle-right' color={CS.ICON}/>
                </TouchableOpacity>

                <TouchableOpacity style={styles.cell}  onPress={() => navigate('Change')}>
                    <Text style={styles.version}> 切换</Text>
                    <Icon name='angle-right' color={CS.ICON}/>
                </TouchableOpacity>
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