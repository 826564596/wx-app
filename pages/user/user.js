const app = getApp();
Page({
    data: {
        userInfo: null
    },
    onLoad: function() {
        this.getUser();
    },
    toShare: function() {
        wx.navigateTo({
            url: "share/share"
        });
    },
    getUser: function() {
        let user = app.globalData.userInfo;
        console.log(user);
        this.setData({
            userInfo: user
        });
    },
    toWIFI: function() {
        wx.navigateTo({
            url: "WIFI/WIFI"
        });
    },
    voice: function() {
        wx.navigateTo({
            url: "../voice/voice"
        });
    },
    message: function() {
        wx.navigateTo({
            url: "message/message"
        });
    }
});
