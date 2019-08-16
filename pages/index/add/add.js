const app = getApp();
Page({
    data: {
        equipmentType: [
            "摄像机",
            "电源开关",
            "照明",
            "家居安防",
            "环境电器",
            "传感器",
            "厨房电器",
            "其他"
        ],
        equipments: null,
        indexeq: "摄像机"
    },
    onLoad: function() {
        let eq = app.globalData.equipments;
        this.setData({
            equipments: eq
        });
    },
    setIndex: function(e) {
        let eq = e.currentTarget.dataset.eq;
        this.setData({
            indexeq: eq
        });
    },
    toConnect: function(e) {
        let eq = e.currentTarget.dataset.eqdata;
        console.log(eq);
        wx.navigateTo({
            url: "../connect/connect?eqpath=" + eq.path
        });
    }
});
