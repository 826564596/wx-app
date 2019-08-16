const app = getApp();
Page({
    data: {
        equipment: null
    },
    onLoad: function(options) {
        this.getEq(options.eqpath);
    },
    getEq: function(e) {
        let eqlist = app.globalData.equipments;
        console.log(eqlist);
        for (let i in eqlist) {
            if (eqlist[i].path == e) {
                this.setData({
                    equipment: eqlist[i]
                });
            }
        }
        console.log(this.data.equipment);
    }
});
