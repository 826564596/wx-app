const app = getApp();
Page({
    data: {
        index: "top1",
        Array: ["qq", "tx", "ssss"],
        mun: 0,
        eq: null
    },
    onLoad: function(options) {
        console.log(options.eqpath);
        this.getEq(options.eqpath);
    },
    getEq: function(e) {
        let eqlist = app.globalData.equipments;
        console.log(eqlist);
        for (let i in eqlist) {
            if (eqlist[i].path == e) {
                this.setData({
                    eq: eqlist[i]
                });
            }
        }
        console.log(this.data.eq);
    },
    next: function() {
        this.setData({
            index: "top2"
        });
        wx.setNavigationBarTitle({
            title: "连接工作WIFI"
        });
    },
    bindPickerChange: function(e) {
        this.setData({
            mun: e.detail.value
        });
    },
    nextTop: function() {
        let path = this.data.eq.path;
        wx.navigateTo({
            url: "../setdata/setdata?eqpath=" + path
        });
    }
});
