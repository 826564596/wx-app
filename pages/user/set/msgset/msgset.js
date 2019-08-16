const app = getApp();
Page({
    data: {
        checked: false
    },
    onLoad: function() {},
    change: function(e) {
        let checkdata = e.detail.value;
        this.setData({
            checked: checkdata
        });
    }
});
