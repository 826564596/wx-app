//index.js
//获取应用实例
const app = getApp();
const request = require("../../utils/request");
// 引用百度地图微信小程序JSAPI模块
let bmap = require("../../utils/bmap-wx/bmap-wx.imn.js");
let wxMarkerData = []; //定位成功回调对象
Page({
    data: {
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse("button.open-type.getUserInfo"),
        equipments: null,
        weatherData: null,
        ak: "uByrD2CmuEIpdTgZeFsPS3HzjgegXPES", //填写申请到的ak
        markers: [],
        cityInfo: {}, //城市信息
        familyInfo: null,
        starTime: 0,
        ClickNum: 0
    },
    //事件处理函数
    bindViewTap: function() {
        wx.navigateTo({
            url: "../logs/logs"
        });

    },
    onLoad: function() {
        //获取用户临时登录凭证，判断
        wx.login({
            success: res => {
                // 发送 res.code 到后台换取 openId, sessionKey, unionId

                app.globalData.code = res.code;
                console.log("第一次code：" + app.globalData.code);
                if (res.code) {
                    wx.request({
                        // url: that.globalData.serverUrl+'api/getOpenId',
                        url: app.globalData.serverUrl + "api/user/weChatSignIn",
                        data: {
                            code: res.code
                        },
                        method: "GET",
                        success: res => {
                            app.globalData.ok = res.data.response.ok; //判断是否是系统用户的标志位，如果不是就关联账号=>login页面
                            console.log(app.globalData.ok);
                            if (app.globalData.ok) {
                                app.globalData.token = res.data.response.token; //每一次的api请求的权限标志
                                //把访问权限标志存储到本地
                                wx.setStorageSync(
                                    "token",
                                    res.data.response.token
                                );
                                //获取用户设备信息

                                this.getMap();
                                this.getWeather();
                                this.getEquipment();
                            } else {
                                wx.redirectTo({
                                    url: "../login/login"
                                });
                            }
                        }
                    });
                }
            }
        });
    },

    onReady: function() {
    },
    onShow: function() {
        console.log("onshow:" + app.globalData.ok);
        this.getFamily();
        this.setData({
            starTime: 0,
            ClickNum: 0
        });
        this.getEquipment();
    },
    getEquipment: function() {
        let list = app.globalData.myEquipment;
        this.setData({
            equipments: list
        });
    },
    getFamily: function() {
        this.setData({
            familyInfo: app.globalData.familyInfo
        });
    },
    toAdd: function() {
        wx.navigateTo({
            url: "add/add"
        });
    },
    getMap: function() {
        let that = this;
        /* 获取定位地理位置 */
        // 新建bmap对象
        let BMap = new bmap.BMapWX({
            ak: that.data.ak
        });
        let fail = function(data) {
            console.log("fail!!!!");
        };
        let success = function(data) {
            //返回数据内，已经包含经纬度
            console.log(data);
            //使用wxMarkerData获取数据
            wxMarkerData = data.wxMarkerData;
            //把所有数据放在初始化data内
            that.setData({
                markers: wxMarkerData,
                cityInfo: data.originalData.result.addressComponent
            });
        };
        // 发起regeocoding检索请求
        BMap.regeocoding({
            fail: fail,
            success: success
        });
    },
    getWeather: function() {
        let that = this;
        let BMap = new bmap.BMapWX({
            ak: "uByrD2CmuEIpdTgZeFsPS3HzjgegXPES" //填写申请到的ak
        });
        let fail = function(data) {
            console.log("fail!!!!");
        };
        let success = function(data) {
            console.log("success!!!");
            console.log(data);
            let weatherData = data.currentWeather[0];
            let temp = weatherData.date.substr(14, 3);
            weatherData.temperature = temp;
            weatherData.weatherDesc = "多云";
            that.setData({
                weatherData: weatherData
            });
        };
        BMap.weather({
            fail: fail,
            success: success
        });
    },
    voice: function() {
        wx.navigateTo({
            url: "../voice/voice"
        });
        // wx.navigateTo({
        //     url: '../logs/logs',
        // })
    },
    //点击事件
    myClick: function(e) {
        let that = this;
        let curTime = e.timeStamp;
        let starTime = this.data.starTime;
        if (that.data.starTime === 0) {
            this.setData({
                starTime: curTime
            });
            setTimeout(function() {
                that.resetClick();
                if (that.data.ClickNum === 1) {
                    // 双击执行事件区
                    that.voice();
                }
            }, 500);
            // 300为双击的时间间隔
        } else {
            if (curTime - starTime < 300) {
                this.setData({
                    ClickNum: 1
                });
            }
        }
    },
    toEq: function(e) {
        let model = e.currentTarget.dataset.model;
        wx.navigateTo({
            url: "./equipment/equipment?model=" + model
        });
    },
    // 单击重置
    resetClick: function() {
        if (this.data.ClickNum === 0) {
            this.setData({
                starTime: 0,
                ClickNum: 0
            });
        }
    }
});
