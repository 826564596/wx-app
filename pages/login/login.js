// pages/login/login.js
const app = getApp();
const Request = require("../../utils/request");
Page({
    /**
     * 页面的初始数据
     */
    data: {
        userName: "826564596@qq.com",
        password: "wbrsnqxhn0",
        code: "",
        ok: app.globalData.ok
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        console.log(app.globalData.ok);
        // if (app.globalData.ok) {
        //     wx.switchTab({
        //         url: "/pages/index/index"
        //     });
        // } else {
        //     wx.login({
        //         success: function(res) {
        //             // success
        //             app.globalData.code = res.code;
        //             console.log("第二次code：" + app.globalData.code);
        //         }
        //     });
        // }
        wx.login({
            success: function(res) {
                // success
                app.globalData.code = res.code;
                console.log("第二次code：" + app.globalData.code);
            }
        });
    },
    /**
     * 获取邮箱
     */
    getuserName: function(e) {
        this.data.userName = e.detail.value;
        console.log(this.data.userName);
    },
    /**
     * 获取密码
     */
    getPassword: function(e) {
        this.data.password = e.detail.value;
        console.log(this.data.password);
    },
    /**
     * 登录
     */
    login: function() {
        let that = this;
        console.log("login:" + app.globalData.code);
        wx.request({
            url: app.globalData.serverUrl + "api/user/weChatAuthorize",
            data: {
                type: "email",
                id: this.data.userName,
                password: this.data.password,
                code: app.globalData.code
            },
            method: "POST", // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            // header: {}, // 设置请求的 header
            success: function(res) {
                // success
                console.log("**********"+res);
                app.globalData.ok = true;
                wx.switchTab({
                    url: "/pages/index/index"
                });
             
            },
            fail: function() {
                // fail
                console.log("fail");
            }
        });
    }
});
