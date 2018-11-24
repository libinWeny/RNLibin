'use strict';

import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    Alert,
    Linking,
    ScrollView,
    Platform,
    StyleSheet,
    PixelRatio,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';

const config = [
    { icon : 'heart', leftText : '关于我们' },
    { icon : 'heart', leftText : '帮助指南' },
    { icon : 'heart', leftText : '意见反馈' },
    { icon : 'heart', leftText : '账号安全' },
    { icon : 'heart', leftText : '密码修改' },
    { icon : 'heart', leftText : '检查更新', rightText : '1.4.4' },
];

export default class ScreenMe extends Component {
    state = {
        data : {
            name:'李斌LOVE文迪',
            mobile:'5201413',
            vipName:'忠爱一身套餐',
            time:'9999-5-20',
        },
    };

    componentDidMount() {
    };

    cellPress = (item) => {
        const { navigate } = this.props.navigation;
        switch (item.leftText) {
            case '我的报备':
                navigate('MyReport');
                break;
            case '邀请好友':
                navigate('GroupFriendsAddConcern');
                break;
            case '我的"订制转发"户型':
                navigate('MyBuilding');
                break;
            case '意见反馈':
                navigate('MyIdea');
                break;
            case '帮助指南':
                navigate('HelpPage');
                break;
            case '检查更新':
                Alert.alert(
                    '',
                    '您的认证还没有完成呢',
                    [
                        { text : '取消', onPress : () => console.log('取消') },
                        { text : '前往', onPress : () => navigate('CertificationSelect') },
                    ],
                    { cancelable : false }
                )
                break;
        }

    };

    render() {
        const { data } = this.state;
        const { navigate } = this.props.navigation;

        return (
            <ScrollView style={styles.container}>
                <LinearGradient
                    start={{ x : 0, y : 1 }}
                    end={{ x : 1, y : 1 }}
                    colors={[ '#FFD4FB', '#FF14FD' ]}
                >
                    <View style={styles.header}>
                        <Image style={styles.photo} source={require('../image/user.jpeg')}/>

                        <View style={styles.msgView}>
                            <Text style={styles.name}>{data.name}</Text>
                            <Text style={[ styles.name, { fontSize : 13 } ]} selectable>电话：{data.mobile}</Text>
                        </View>
                        <TouchableOpacity style={{ flexDirection : 'row',justifyContent:'center' }} onPress={() => navigate('Setting')}>
                            <Text style={styles.setText}>设置 </Text>
                            <Icon name='angle-right' size={18} color='white'/>
                        </TouchableOpacity>
                    </View>
                </LinearGradient>

                <View style={styles.vipView}>
                    <View style={styles.vipViewCell}>
                        <Text style={[styles.text,{flex:1}]}>我的账户</Text>
                        <Text style={styles.text} onPress={() => navigate('MyPayLog')}>充值记录  <Icon name='angle-right' color={CS.ICON}/></Text>
                    </View>

                    <View style={styles.vipViewCell2}>
                        <Text style={{ fontSize : 15, fontWeight : 'bold',color:CS.MAIN }}>{data.vipName}</Text>
                        <Text style={{ fontSize : 13,  marginTop : 10,color:CS.MAIN }}>{`有效期：${data.time}`}</Text>
                    </View>

                    <View style={styles.vipViewCell3}>
                        <TouchableOpacity style={styles.btnBox}>
                            <Text style={styles.setText}>去充值</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {
                    config.map(item =>
                        <TouchableOpacity style={styles.cell} key={item.leftText} onPress={() => this.cellPress(item)}>
                            <Icon name={item.icon} size={24} color={CS.MAIN}/>
                            <Text style={styles.text}> {item.leftText}</Text>
                            <Text style={styles.version}> {item.rightText}</Text>
                            <Icon name='angle-right' color={CS.ICON}/>
                        </TouchableOpacity>
                    )
                }

            </ScrollView>
        );
    }

}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : CS.BG,
    },
    header : {
        height : 180,
        flexDirection : 'row',
        borderBottomWidth : 10,
        borderBottomColor : CS.BG,
        paddingHorizontal : 15,
        alignItems : 'center',
    },
    photo : {
        width : 60,
        height : 60,
        borderRadius : 30,
    },
    msgView : {
        flex : 1,
        height : 52,
        paddingLeft : 15,
        justifyContent : 'space-around',
    },
    name : {
        fontSize : 18,
        color : 'white',
        maxWidth : W / 2,
    },
    setText : {
        fontSize : 18,
        color : 'white',
    },

    imgBack : {
        width : 6,
        height : 12,
        // position : 'absolute',
        // right: 15,
    },
    vipView : {
        marginHorizontal : 15,
        marginBottom : 20,
        marginTop : -20,
        backgroundColor : 'white',
        borderRadius : 10,
    },
    vipViewCell : {
        flexDirection : 'row',
        justifyContent : 'space-between',
        paddingHorizontal : 15,
        paddingTop : 10,
        paddingBottom : 10,
    },
    vipViewCell2 : {
        padding : 15,
        borderBottomWidth : 1 / PixelRatio.get(),
        borderBottomColor : '#cccccc',
        borderTopWidth : 1 / PixelRatio.get(),
        borderTopColor : '#cccccc',
        justifyContent : 'space-between',
    },
    vipViewCell3 : {
        height : 80,
        justifyContent : 'center',
        alignItems : 'center',
    },
    btnBox : {
        height : 30,
        width : 140,
        alignItems : 'center',
        backgroundColor : CS.MAIN,
        justifyContent : 'center',
        borderRadius : 15,
        alignSelf : 'center',
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
        color :'#333333',
        textAlign : 'left',
        flex : 1,

    },
    cellImgBack : {
        width : 6,
        height : 12,
        position : 'absolute',
        right : 15,
    },
    version : {
        fontSize : 14,
        color : CS.ICON,
        textAlign : 'right',
        flex : 1,
    },
});



