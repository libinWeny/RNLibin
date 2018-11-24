import React, { Component } from 'react';
import {
    View,
    TouchableOpacity,
    Image,
    Text, StyleSheet,
    Modal,
    ActivityIndicator,
} from 'react-native';

import ImageViewer from 'react-native-image-zoom-viewer';
const img = 'https://timgsa.baidu.com/timg?image&quality=80&size=b10000_10000&sec=1543043513&di=d2d706dcbae34bbaef450dbe693c9404&src=http://imgsrc.baidu.com/imgad/pic/item/ac345982b2b7d0a2f4bb5ca6c0ef76094b369a9f.jpg';

export default class ImageBigLook extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerTitle : '图片放大查看'
    });

    state = {
        showImg : false,
        showImgIndex : 1,
        imgs : [
            {
                url : 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1543053538689&di=6139c24de8ab264058e3c83b9be5b844&imgtype=0&src=http%3A%2F%2Fpic.51yuansu.com%2Fpic3%2Fcover%2F01%2F99%2F91%2F598492c897276_610.jpg',
            },
            {
                url : 'https://timgsa.baidu.com/timg?image&quality=80&size=b10000_10000&sec=1543043513&di=d2d706dcbae34bbaef450dbe693c9404&src=http://imgsrc.baidu.com/imgad/pic/item/ac345982b2b7d0a2f4bb5ca6c0ef76094b369a9f.jpg',
            },
            {
                url : 'https://timgsa.baidu.com/timg?image&quality=80&size=b10000_10000&sec=1543043513&di=fc6e5aadae367cf02f72e5d2a2f1ae1d&src=http://images.qudao.com/brandimgs/2014-09-10/540fad52594d7_520_430.jpg',
            }

        ]
    };

    render() {
        return (
            <View style={styles.container}>

                <TouchableOpacity
                    style={styles.box}
                    onPress={() => this.setState({ showImg : true })}
                >
                    <Image source={{ uri : img }} style={styles.img}/>
                    <Text>点击查看</Text>
                </TouchableOpacity>
                <Modal
                    animationType={'fade'}
                    visible={this.state.showImg}
                    transparent={true}
                    onRequestClose={() => {
                        this.setState({ showImg : false })
                    }}
                >
                    <ImageViewer
                        index={this.state.showImgIndex}
                        onSwipeDown={() => this.setState({ showImg : false })}
                        imageUrls={this.state.imgs}
                        onClick={() => this.setState({ showImg : false })}
                        // failImageSource={defaultSource} // 占位符失败图片
                        loadingRender={() =>
                            <View style={{ justifyContent : 'center', height : H }}>
                                <ActivityIndicator/>
                            </View>}
                    />
                </Modal>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center',
    },
    box:{
        justifyContent : 'center',
        alignItems : 'center',
    },
    img : {
        width : W - 100,
        height : W / 2,
    }
});


