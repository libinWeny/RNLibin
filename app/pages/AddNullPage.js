'use strict';

import React, { Component } from 'react';

import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

export default class AddNullPage extends Component {



    render() {
        return (
            <View>
                <Text>MePage</Text>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    wrapper : {
        borderRadius : 5,
        marginBottom : 5,
    },
    button : {
        backgroundColor : '#eeeeee',
        padding : 10,
    },
});