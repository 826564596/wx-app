const app = getApp();
Page({
    data: {
        viewMode: null,
        text1: "开启后，MIUI系统中发现附近待添加的智能设备将自动弹窗提示",
        text2: "开启后，添加设备是将自动连接至附近已保存的路由器"
    },
    onLoad: function() {
        let mode = app.globalData.viewMode;
        this.setData({
            viewMode: mode
        });
        console.log(getCurrentPages());
    },
    onShow: function() {
        this.onLoad();
    },
    switchMode: function(e) {
        let mode = e.currentTarget.dataset.mode;
        wx.navigateTo({
            url: "displayMode/displayMode?mode=" + mode
        });
    },
    roomManage: function() {
        wx.navigateTo({
            url: "roomManage/roomManage"
        });
    },
    msgset: function() {
        wx.navigateTo({
            url: "msgset/msgset"
        });
    },
    region: function() {
        wx.navigateTo({
            url: "region/region"
        });
    },
    setLanguage: function() {
        wx.navigateTo({
            url: "setLanguage/setLanguage"
        });
    },
    exit: function() {
        wx.navigateBack({
            delta: 3 // 回退前 delta(默认为1) 页面
        });
    }
});
