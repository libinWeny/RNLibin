'use strict';

import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    SafeAreaView, Image,
    ScrollView, StyleSheet,
} from 'react-native';

import { SegmentedControl } from 'antd-mobile-rn';

export default class TabPage extends Component {

    static navigationOptions = ({
        header : null
    })

    state = {
        select : 0,
    };

    changeSelectTitle(e) {
        let setX = e.nativeEvent.contentOffset.x;

        if (setX) {
            this.setState({ select : 1 })
        } else {
            this.setState({ select : 0 })
        }

    }

    render() {
        const { status, select } = this.state;
        const { navigate, state } = this.props.navigation;
        return (
            <View style={styles.container}>
                <View style={styles.headerView}>

                    <SegmentedControl
                        style={styles.segmentedControl}
                        values={[ '房产圈', '互动' ]}
                        selectedIndex={this.state.select}
                        // onChange={(e) => this.setState({ select : e.nativeEvent.selectedSegmentIndex })}
                        onChange={(e) => this.refs.ScrollView.scrollTo({
                            x : W * e.nativeEvent.selectedSegmentIndex,
                            animated : true
                        })}
                    >
                        <View style={{
                            backgroundColor : CS.THEME11, width : 6, height : 6,
                            position : 'absolute', top : 4, right : 4, borderRadius : 3,
                        }}/>
                    </SegmentedControl>

                </View>

                <ScrollView
                    ref={'ScrollView'}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    // 滚动动画结束时调用此函数。
                    onMomentumScrollEnd={(e) => this.changeSelectTitle(e)}
                >

                    <View style={styles.page1}/>
                    <View style={styles.page2}/>
                </ScrollView>

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
});