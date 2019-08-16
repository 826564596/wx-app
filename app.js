//app.js

const utils = require("./utils/util.js");
App({
    globalData: {
        token: "", //每一次的api请求的权限标志
        ok: false, //判断是否是系统用户的标志位，如果不是就关联账号=>login页面
        code: "", //临时登录凭证
        appid: "wx6c8305cda951f17a",
        appSecret: "570a62dd7848629d2c6e49bacea97682",
        // serverUrl: "http://10.10.122.192:3000/", //服务器地址
        // serverUrl: "http://10.10.122.212:3000/", //服务器地址
        // serverUrl: "http://10.10.122.116:3000/", //服务器地址
        // serverUrl: "http://192.168.0.114:3000/", //服务器地址
        serverUrl: "http://10.10.72.2:3000/", //服务器地址


        
        userInfo: null,
        history: [], //语音历史记录
        order: [
            {
                img: "asd",
                order: {
                    one: "one",
                    one: "one",
                    one: "one"
                }
            },
            {
                img: "asd",
                order: {
                    two: "two",
                    two: "two",
                    two: "two"
                }
            },
            {
                img: "asd",
                order: {
                    three: "three",
                    three: "three",
                    three: "three"
                }
            }
        ],
        equipments: [
            {
                type: "摄像机",
                path: "../../../images/equipment/img1.png",
                eqName: "小米摄像机"
            },
            {
                type: "摄像机",
                path: "../../../images/equipment/img2.png",
                eqName: "方正摄像机"
            },
            {
                type: "摄像机",
                path: "../../../images/equipment/img3.png",
                eqName: "米家摄像机"
            },
            {
                type: "摄像机",
                path: "../../../images/equipment/img4.png",
                eqName: "小白智能摄像机"
            },
            {
                type: "照明",
                path: "../../../images/equipment/img6.png",
                eqName: "圆形暖光灯"
            }
        ],
        viewMode: "列表",
        familyInfo: null,
        myEquipment: [
            {
                name: "米家LED吸顶灯",
                model: "XMD001",
                position: "客厅",
                state: "close"
            },
            {
                name: "米家温湿度传感器",
                model: "XMCGQ002",
                position: "主卧",
                state: "open",
                data: {
                    temp: "20℃",
                    humi: "40%"
                }
            }
        ],
        equipmentData: [
            {
                name: "米家LED吸顶灯",
                model: "XMD001",
                connectionMode: "Wi-Fi IEEE 802.11 b/g/n",
                workingTemperature: "-10~40℃",
                workingHumidity: "0~85%RH",
                workingLife: "25000h",
                power: "32W",
                voltage: "220v~50/60Hz",
                current: "0.145A"
            },
            {
                name: "米家无线开关",
                model: "XMKG001",
                connectionMode: "Wi-Fi IEEE 802.11 b/g/n",
                workingTemperature: "-10~50℃",
                workingHumidity: "0~95%RH"
            },
            {
                name: "米家插线板",
                model: "XMCXB001",
                connectionMode: "Wi-Fi IEEE 802.11 b/g/n",
                workingTemperature: "-10~40℃",
                workingHumidity: "0~95%RH",
                powerMax: "2500W",
                voltage: "250v~",
                currentMax: "10A"
            },
            {
                name: "米家电水壶",
                model: "XMDSH001",
                connectionMode: "Wi-Fi IEEE 802.11 b/g/n",
                capacity: "1.5L",
                power: "1800W",
                voltage: "220v~50Hz"
            },
            {
                name: "米家IH电饭煲",
                model: "XMDFB001",
                connectionMode: "Wi-Fi IEEE 802.11 b/g/n",
                capacity: "3L",
                power: "1130W",
                voltage: "220v~50H"
            },
            {
                name: "米家直流变频落地扇",
                model: "XMLDS001",
                connectionMode: "Wi-Fi IEEE 802.11 b/g/n",
                windAmount: "<20㎡/min",
                noise: "<60dB",
                power: "20W",
                voltage: "220v~50Hz"
            },
            {
                name: "米家门窗传感器",
                model: "XMCGQ001",
                connectionMode: "Wi-Fi IEEE 802.11 b/g/n",
                workingTemperature: "-10~45℃",
                batteryType: "CR1632"
            },
            {
                name: "米家温湿度传感器",
                model: "XMCGQ002",
                connectionMode: "Wi-Fi IEEE 802.11 b/g/n",
                temperatureAccuracy: "-20~60℃ ±0.3℃",
                humidityAccuracy: "0~100%RH ±3%",
                batteryType: "CR2032"
            },
            {
                name: "米家LED台灯",
                model: "XMTD001",
                connectionMode: "Wi-Fi IEEE 802.11 b/g/n",
                power: "10W",
                voltage: "100-240v~50/60Hz",
                current: "0.3A"
            },
            {
                name: "米家空气净化器",
                model: "XMKQJHQ001",
                connectionMode: "Wi-Fi IEEE 802.11 b/g/n",
                power: "86W(待机<2W)",
                voltage: "220v~50/60Hz",
                noise: "<63.5dB(睡眠模式<34dB)",
                workingArea: "70~120㎡"
            }
        ]
    },
    onLaunch: function() {
        let that = this;
        wx.getUserInfo({
            success: function(res) {
                // success
                console.log(res);
            },
            fail: function() {
                // fail
            },
            complete: function() {
                // complete
            }
        });
        wx.getStorage({
            key: "history",
            success: res => {
                this.globalData.history = res.data;
            },
            fail: res => {
                console.log("获取本地存储文件失败");
                console.log(res);
                this.globalData.history = [];
            }
        });
        // 登录
        // wx.login({
        //     success: res => {
        //         // 发送 res.code 到后台换取 openId, sessionKey, unionId

        //         that.globalData.code = res.code;
        //         console.log("第一次code：" + that.globalData.code);
        //         if (res.code) {
        //             wx.request({
        //                 // url: that.globalData.serverUrl+'api/getOpenId',
        //                 url:
        //                     that.globalData.serverUrl + "api/user/weChatSignIn",
        //                 data: {
        //                     code: res.code
        //                 },
        //                 method: "GET",
        //                 success: function(res) {
        //                     that.globalData.ok = res.data.response.ok;
        //                     console.log(that.globalData.ok);
        //                 }
        //             });
        //         }
        //         // wx.request({
        //         //     url: `https://api.weixin.qq.com/sns/jscode2session?appid=${
        //         //         that.globalData.appid
        //         //     }&secret=${that.globalData.appSecret}&js_code=${
        //         //         res.code
        //         //     }&grant_type=authorization_code`,
        //         //     data: {},
        //         //     method: "GET",
        //         //     success: function(res) {
        //         //         console.log(res.data.openid);
        //         //     }
        //         // });
        //     }
        // });
        // 获取用户信息
        wx.getSetting({
            success: res => {
                if (res.authSetting["scope.userInfo"]) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wx.getUserInfo({
                        success: res => {
                            // 可以将 res 发送给后台解码出 unionId
                            this.globalData.userInfo = res.userInfo;

                            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                            // 所以此处加入 callback 以防止这种情况
                            if (this.userInfoReadyCallback) {
                                this.userInfoReadyCallback(res);
                            }
                        }
                    });
                }
            }
        });
    },
    getRecordAuth: function() {
        wx.getSetting({
            success(res) {
                console.log("获取设置成功");
                console.log(res);
                if (!res.authSetting["scope.record"]) {
                    wx.authorize({
                        scope: "scope.record",
                        success() {
                            // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
                            console.log("授权成功");
                        },
                        fail() {
                            console.log("授权失败");
                        }
                    });
                } else {
                    console.log("录音已经授权");
                }
            },
            fail(res) {
                console.log("fail");
                console.log(res);
            }
        });
    },

    onHide: function() {
        wx.stopBackgroundAudio();
    }
});
