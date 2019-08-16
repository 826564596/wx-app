const app = getApp();
Page({
    data: {
        familyInfo: null,
        visible: false
    },
    onLoad: function() {
        this.getFamily();
    },
    getFamily: function() {
        let family = app.globalData.familyInfo;
        this.setData({
            familyInfo: family
        });
    },
    changeName: function() {
        this.setData({
            visible: true
        });
    },
    handleClose1: function() {
        this.setData({
            visible: false
        });
        this.onLoad();
    },
    getName: function(e) {
        let name = e.detail.value;
        app.globalData.familyInfo.name = name;
    },
    handleClose2: function() {
        this.setData({
            visible: false
        });
    }
});
