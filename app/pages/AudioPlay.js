import React, { Component } from 'react';
import {
    View,
    TouchableOpacity,
    Image,
    Text, StyleSheet,
    Platform,
    ImageBackground,
} from 'react-native';

import Sound from 'react-native-sound';
import { Toast } from 'antd-mobile-rn'

export default class LuYinBoFang extends Component {
    static navigationOptions = ({ navigation }) => ({
        header : null
    })

    state = {
        data : this.props.navigation.getParam('data', {}),
        time : 0,
        playing : false,
        sound : undefined,

    }

    componentWillMount() {
        const sound = new Sound(this.state.data.audioPath, '', (error) => {
            if (error) {
                console.log('failed to load the sound', error);
            }
        });
        this.setState({
            sound : sound
        })
    }

    getTime = (oleTime) => {
        if (oleTime < 60) {
            return oleTime
        }
        else if (60 < oleTime < 3600) {
            return Math.floor(oleTime / 60) + ':' + oleTime % 60
        } else if (3600 <= oleTime < 359999) {
            return Math.floor(oleTime / 360) + ':' + Math.floor(oleTime / 360) + ':' + oleTime % 60
        } else {
            return 0
        }
    }

    render() {
        const uri = this.state.playing ? require('../image/record_suspend.png') : require('../image/record_zanting.png')
        return (
            <ImageBackground source={require('../image/bg_record.png')} style={styles.container}>
                <View style={styles.view}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}
                                      style={styles.imgBox}>
                        <Image
                            source={require('../image/back.png')}
                            style={styles.imgLeft}
                        />
                    </TouchableOpacity>
                    <Text style={styles.text}>录音播放</Text>
                    <View style={{ width : 40 }}/>
                </View>

                <View style={styles.bottomView}>
                    <View>
                        <Text
                            style={styles.timeText}>{this.state.time}/{this.getTime(this.state.data.duration)}s</Text>
                    </View>

                    <TouchableOpacity onPress={() => this.onClick()}>
                        <Image
                            source={uri}
                            style={styles.imgCenter}
                        />
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        );
    }

    onClick() {
        if (this.state.playing) {
            this._pause()
            this.setState({
                playing : false
            })
        } else {
            if (this.state.time == this.state.data.duration) {
                this.setState({
                    time : 0
                })
            }

            this._play()
            this.setState({
                playing : true
            })
        }
    }

    async _pause() {
        setTimeout(() => {
            this.state.sound.pause((success) => {
                if (success) {
                    console.log('successfully finished playing');
                } else {
                    console.log('playback failed due to audio decoding errors');
                }
            });
        }, 100);

        /**清空定时器 */
        this.timer && clearInterval(this.timer)
    }

    async _play() {

        this.state.sound.play((success) => {
            if (success) {
                console.log('successfully finished playing');
            } else {
                console.log('playback failed due to audio decoding errors');
            }
        });

        this.timer = setInterval(() => {
            if (this.state.time < this.state.data.duration && this.state.playing) {
                this.setState({
                    time : this.state.time + 1
                })
            } else if (this.state.time == this.state.data.duration) {
                /**清空定时器 */
                this.timer && clearInterval(this.timer)
                this.setState({
                    playing : false,
                })

                Toast.info('播放完毕', 0.5)
                return
            } else {
                return
            }

        }, 1000)

    }

    componentWillUnmount() {
        //this.state.sound.stop();
        this.state.sound.release();
        /**清空定时器 */
        this.timer && clearTimeout(this.timer)

    }

}

const styles = StyleSheet.create({
    container : {
        height : H,
        width : W,
    },

    header : {
        height : 64,
    },

    view : {
        paddingTop : Platform.OS === 'ios' ? 20 : 0,
        height : Platform.OS === 'ios' ? 64 : 44,
        justifyContent : 'space-between',
        flexDirection : 'row',
        alignItems : 'center'
    },

    imgBox : {
        width : 40,
        height : 40,
        justifyContent : 'center',
        alignItems : 'center'
    },

    imgLeft : {
        width : 22,
        height : 22,
    },

    text : {
        color : '#ffffff',
        fontSize : 18,
        backgroundColor : 'transparent',

    },

    bottomView : {
        flex : 1,
        justifyContent : 'space-around',
        alignItems : 'center',
    },

    timeText : {
        fontSize : 28,
        color : '#ffffff',
        backgroundColor : 'transparent',
    },
    imgCenter : {
        marginTop : 60,
        width : 100,
        height : 100,
    }

});


