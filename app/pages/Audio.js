/**
 *李斌 2017-06-08
 *现场录音页面
 */

import React, { Component } from 'react';
import {
    View,
    TouchableOpacity,
    Image,
    Text,
    StyleSheet,
    Platform,
    ImageBackground,
} from 'react-native';

import { AudioRecorder, AudioUtils } from 'react-native-audio';
import { Toast } from 'antd-mobile-rn';

export default class Audio extends Component {
    static navigationOptions = ({ navigation }) => ({
        header : null
    })

    state = {
        //录音时间
        currentTime : 0,
        //是否正在录音
        recording : false,
        finished : false,
        stoppedRecording : false,
        //录音保存地址
        audioPath : AudioUtils.DocumentDirectoryPath + '/' + Date.parse(new Date()) + '.aac',
        //录音权限
        hasPermission : undefined,
    };

    prepareRecordingPath(audioPath) {
        AudioRecorder.prepareRecordingAtPath(audioPath, {
            SampleRate : 22050,
            Channels : 1,
            AudioQuality : "Low",
            AudioEncoding : "aac",
            AudioEncodingBitRate : 32000
        });
    }

    componentDidMount() {
        this._checkPermission().then((hasPermission) => {
            this.setState({ hasPermission });

            if (!hasPermission) {
                return;
            }

            this.prepareRecordingPath(this.state.audioPath);

            AudioRecorder.onProgress = (data) => {
                this.setState({ currentTime : Math.floor(data.currentTime) });
            };

            AudioRecorder.onFinished = (data) => {
                // Android callback comes in the form of a promise instead.
                if (Platform.OS === 'ios') {
                    this._finishRecording(data.status === "OK", data.audioFileURL);
                }
            };
        });
    }

    _checkPermission() {
        if (Platform.OS !== 'android') {
            return Promise.resolve(true);
        }

        const rationale = {
            'title' : 'Microphone Permission',
            'message' : 'AudioExample needs access to your microphone so you can record audio.'
        };

        return PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO, rationale)
            .then((result) => {
                console.log('Permission result:', result);
                return (result === true || result === PermissionsAndroid.RESULTS.GRANTED);
            });
    }

    _finishRecording(didSucceed, filePath) {
        this.setState({ finished : didSucceed });
        console.log(`Finished recording of duration ${this.state.currentTime} seconds at path: ${filePath}`);
    }

    _Myrecord() {
        if (this.state.recording) {
            this._pause()
        } else {
            this._record()
        }

    }

    _Mycancel() {
        this._stop()
    }

    async _Mysave() {

        if (this.state.recording) {
            Toast.info('请先停止再保存', 0.5)
            return;
        } else if (this.state.currentTime == 0) {
            Toast.info('请先开始录音再保存', 0.5)
            return;
        } else {
            const time = new Date()
            const data = {
                //录音时长
                duration : this.state.currentTime,
                //录音保存地址
                audioPath : this.state.audioPath,
                //录音名字
                title : Date.parse(time) + '.aac',
                //录音时间
                time : new Date(),
                id : Date.parse(time).toString(),
            }
            storage.save({
                key : 'audio',  // 注意:请不要在key中使用_下划线符号!
                id : Date.parse(time).toString(),
                data : data
            });
            Toast.info('保存录音成功', 0.5)

        }

    }

    async _pause() {
        Toast.info('停止录音')
        this.setState({ stoppedRecording : true, recording : false });
        try {
            const filePath = await AudioRecorder.pauseRecording();
            // Pause is currently equivalent to stop on Android.
            if (Platform.OS === 'android') {
                this._finishRecording(true, filePath);
            }
        } catch (error) {
            console.error(error);
        }
    }

    async _stop() {
        if (this.state.currentTime == 0) {
            Toast.info('没有开始，不能取消')
            return;
        }

        this.setState({
            stoppedRecording : true,
            recording : false,
            currentTime : 0.0,
            finished : false,
            audioPath : AudioUtils.DocumentDirectoryPath + '/' + Date.parse(new Date()) + '.aac',
        });

        Toast.info('取消成功')

        if (this.state.recording) {
            try {
                const filePath = await AudioRecorder.stopRecording();
                if (Platform.OS === 'android') {
                    this._finishRecording(true, filePath);
                }
                return filePath;
            } catch (error) {
                console.error(error);
            }
        }

    }

    async _record() {
        Toast.info('开始录音')

        if (!this.state.hasPermission) {
            console.warn('没有权限');
            return;
        }

        if (this.state.stoppedRecording) {
            this.prepareRecordingPath(this.state.audioPath);
        }

        this.setState({ recording : true });

        try {
            const filePath = await AudioRecorder.startRecording();
        } catch (error) {
            console.error(error);
        }
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
        const { navigate, goBack } = this.props.navigation;
        const uri = this.state.recording ? require('../image/record_suspend.png') : require('../image/record.png')

        return (
            <ImageBackground source={require('../image/bg_record.png')} style={styles.container}>
                <View style={styles.view}>
                    <TouchableOpacity onPress={() => goBack()}>
                        <Image
                            source={require('../image/back.png')}
                            style={styles.imgLeft}
                        />
                    </TouchableOpacity>
                    <Text style={styles.text}>现场录音</Text>
                    <TouchableOpacity onPress={() => navigate('AudioList')}>
                        <Image
                            source={require('../image/list.png')}
                            style={styles.imgRight}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.container}>
                    <Text style={styles.timeText}>{this.getTime(this.state.currentTime)}s</Text>
                    <View style={styles.bottomView}>
                        <TouchableOpacity onPress={() => this._Mycancel()}>
                            <Image
                                source={require('../image/cancel_record.png')}
                                style={styles.img}
                            />
                            <Text style={styles.bottomText}>取消</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this._Myrecord()}>
                            <Image
                                source={uri}
                                style={styles.imgCenter}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this._Mysave()}>
                            <Image
                                source={require('../image/ok_record.png')}
                                style={styles.img}
                            />
                            <Text style={styles.bottomText}>保存</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        );
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
        marginHorizontal : 14,
        flexDirection : 'row',
        alignItems : 'center'
    },
    imgLeft : {
        width : 13,
        height : 21,
    },
    imgRight : {
        width : 22,
        height : 22,
    },
    text : {
        color : '#ffffff',
        fontSize : 18,
        backgroundColor : 'transparent',

    },
    timeText : {
        marginTop : H / 6,
        fontSize : 50,
        color : '#ffffff',
        textAlign : 'center',
        backgroundColor : 'transparent',
    },
    bottomView : {
        //flex:1,
        flexDirection : 'row',
        justifyContent : 'space-around',
        alignItems : 'center',
        marginTop : H / 3,
    },
    img : {
        width : 30,
        height : 30,

    },
    bottomText : {
        marginTop : 6,
        fontSize : 14,
        color : CS.MAIN,
        backgroundColor : 'transparent',
    },
    imgCenter : {
        width : 100,
        height : 100,
    }
});


