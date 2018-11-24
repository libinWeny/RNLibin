import React, { Component } from 'react';
import {
    ListView,
    Text,
    View,
    Image,
    Modal,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    FlatList,
} from 'react-native';
import { SwipeAction, Toast } from 'antd-mobile-rn';

export default class AudioList extends Component {
    static navigationOptions = ({ navigation }) => ({
        title : '录音记录',
        headerRight : (
            <TouchableOpacity style={styles.headerBox} onPress={() => navigation.state.params.onPress()}>
                <Text style={styles.headerText}>清空</Text>
            </TouchableOpacity>
        )
    })

    state = {
        list:[],
        visible : false,//修改场景   是否可见
        title : undefined, // 修改场景  录音的标题
    }

    componentDidMount() {
        this.props.navigation.setParams({ onPress : () => this._clear })
        this._readData()
    }

    //清空所有的录音记录
    _clear() {
        storage.clearMapForKey('audio').then(data => {
            //清空所有后 刷新页面
            this._readData()
            Toast.success('删除成功')
        })
    }

    //删除单个聊天记录录音记录
    _delete(id) {
        storage.remove({
            key : 'audio',
            id : id
        }).then(data => {
            //清空所有后 刷新页面
            this._readData()
            Toast.success('删除成功')
        })
    }

    // 读取
    _readData() {
        storage.getAllDataForKey('audio').then(data => {
            if (data) {
                this.setState({
                    list : data,
                });
            } else {
                Toast.info('没有数据')
            }

        }).catch(err => {
            //如果没有找到数据且没有sync方法，
            //或者有其他异常，则在catch中返回
            //console.warn(err.message);
            switch (err.name) {
                case 'NotFoundError':
                    Toast.info('找不到数据啦')
                    console.log(err);
                    break;
                case 'ExpiredError':
                    Toast.info('出错啦')
                    break;
            }
        })
    }

    render() {
        return (
            <FlatList
                data={this.state.list}
                renderItem={this.renderItem}
                pageSize={5}
                //下拉到底部的时候调用  加载更多的方法
                scrollRenderAheadDistance={500}
                //预加载 距离最底部10  的时候开始调用onEndReached
                onEndReachedThreshold={10}
            />
        );
    }

    getTime =(oleTime)=> {
        if(oleTime<60){
            return oleTime+'秒'
        }
        else if (60<oleTime<3600) {
            return Math.floor(oleTime/60)+'分'+ oleTime%60+'秒'
        }else if(3600<=oleTime<359999) {
            return Math.floor(oleTime/360)+'时'+Math.floor(oleTime/360)+'分'+ oleTime%60+'秒'
        }else {
            return '0秒'
        }
    }

    renderItem = (item) => {

        const data = item.item;

        console.log('item',item)
        const right = [
            {
                text : '删除',
                onPress : () => this._delete(data.id),
                style : { backgroundColor : 'red', color : 'white' },
            },
        ];

        return (
            <SwipeAction autoClose right={right}>
                <TouchableOpacity onPress={() => this._itemClick(data)} style={styles.item}>
                    <View style={styles.view}>
                        <View style={styles.itemView}>
                            <Text style={styles.text4}>{data.title}</Text>
                        </View>
                        <View style={styles.itemView}>
                            <Text style={styles.text8}>{data.time}</Text>

                            <Text style={styles.text8}>   {this.getTime(data.duration)}</Text>
                        </View>
                    </View>
                    <Image source={require('../image/start.png')} style={styles.img}/>
                </TouchableOpacity>
            </SwipeAction>
        );
    }

    _itemClick(data) {
        const { navigate } = this.props.navigation;
        navigate('AudioPlay', { data : data, })
    }
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
    },
    headerBox : {
        width : 50,
        height : 40,
        alignItems : 'center',
        justifyContent : 'center'
    },
    headerText : {
        fontSize : 16,
        color : 'white',
    },

    item : {
        backgroundColor : 'white',
        flexDirection : 'row',
        justifyContent : 'space-between',
        padding : 10,
        marginBottom : 0.5,
        height : 66,
        alignItems : 'center'
    },

    view : {
        justifyContent : 'space-around',
    },

    itemView : {
        height : 30,
        paddingHorizontal : 10,
        flexDirection : 'row',
        alignItems : 'center',
    },

    text4 : {
        fontSize : 15,
    },
    text8 : {
        fontSize : 12,
    },

    img : {
        height : 22,
        width : 22,
    },

});






