const app = getApp();
Page({
    data: {
        regions: [
            "大陆地区(推荐)",
            "韩国",
            "台湾地区",
            "香港地区",
            "新加坡",
            "印度",
            "俄罗斯",
            "美国",
            "欧洲",
            "其他"
        ],
        selected: "大陆地区(推荐)"
    },
    onLoad: function() {},
    change: function(e) {
        var region = e.currentTarget.dataset.region;
        this.setData({
            selected: region
        });
    }
});
