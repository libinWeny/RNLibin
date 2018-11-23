import { Component } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import Icon from 'react-native-vector-icons/FontAwesome';

const Badge = (props) => {
    const { text } = props;
    return (
        <View style={{
            backgroundColor : CS.MAIN,
            borderRadius : 7,
            height : 14,
            paddingHorizontal : 4,
            position : 'absolute',
            top : 2,
            left : 20,
        }}>
            <Text style={{ fontSize : 10, color : '#ffffff', }}>{text}</Text>
        </View>
    );
};

export default class TabBarItem extends Component {
    render() {
        const { tabBarIconName, focused } = this.props;
        if (tabBarIconName === 'plus-circle') {
            return (
                <View style={{ marginTop : -20, flex : 1, alignItems : 'center', justifyContent : 'center' }}>
                    <Icon name={'plus-circle'} color={CS.MAIN} size={46}/>
                </View>
            );
        } else {
            return (
                <View style={{ flex : 1, alignItems : 'center', justifyContent : 'center' }}>
                    <Icon name={tabBarIconName} color={focused ? CS.MAIN : CS.ICON} size={26}/>
                    <Badge text={2}/>
                </View>
            );
        }

    }
}
