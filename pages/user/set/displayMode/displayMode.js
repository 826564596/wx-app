const app = getApp();
Page({
    data: {
        mode: ["列表", "宫格"],
        current: null
    },
    onLoad: function(options) {
        this.setData({
            current: options.mode
        });
    },
    handleModeChange({ detail = {} }) {
        this.setData({
            current: detail.value
        });
        console.log(detail.value);
        app.globalData.viewMode = detail.value;
    }
});
