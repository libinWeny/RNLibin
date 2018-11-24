'use strict';

import React, { Component } from 'react';
import {
    Text,
    View,
    ScrollView,
    StyleSheet,
} from 'react-native';

const config = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];

export default class ColorHeader extends Component {
    static navigationOptions = {
        // headerTitle : '我是渐变色头部',
        header : null,
    };

    componentWillUnmount() {
    }

    _onScroll(event) {
        let y = event.nativeEvent.contentOffset.y;
        let opacityPercent = y / 200;
        if (y < 200) {
            this.navBar.setNativeProps({
                style : {
                    opacity : opacityPercent,
                }
            })
        } else {
            this.navBar.setNativeProps({
                style : {
                    opacity : 1,
                }
            })
        }

    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView
                    style={styles.container}
                    onScroll={(event) => this._onScroll(event)}
                >
                    {
                        config.map(item =>
                            <View style={styles.item} key={item}>
                                <Text>元气满满的第 {item} 天</Text>
                            </View>
                        )
                    }

                </ScrollView>
                <View
                    ref={ref => this.navBar = ref}
                    style={[ styles.header, {
                        backgroundColor : 'red',
                        position : 'absolute',
                        top : 0,
                        left : 0,
                        right : 0,
                        opacity : 0,
                    } ]}
                >
                    <Text>我是渐变色头部</Text>
                </View>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container : {
        flex : 1,
    },
    header : {
        height : 80,
        backgroundColor : '#ffffff',
        justifyContent : 'center',
        alignItems : 'center',
    },
    item : {
        height : 100,
        backgroundColor : CS.MAIN,
        marginTop : 1,
        justifyContent : 'center',
        alignItems : 'center',
    },
});




