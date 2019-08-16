const app = getApp();
Page({
    data: {
        equipment: null,
        power: false
    },
    onLoad: function(e) {
        this.getEq(e.model);
    },
    getEq: function(model) {
        let eqList = app.globalData.myEquipment;
        for (let i in eqList) {
            if (eqList[i].model == model) {
                this.setData({
                    equipment: eqList[i]
                });
                if (eqList[i].state == "open") {
                    this.setData({
                        power: true
                    });
                }
            }
        }
    },
    change: function(e) {
        let power = e.detail.value;
        let state;
        if (power == true) {
            state = "open";
        } else {
            state = "close";
        }
        this.setData({
            power: power
        });
        let eqList = app.globalData.myEquipment;
        for (let i in eqList) {
            if (eqList[i].model == this.data.equipment.model) {
                eqList[i].state = state;
            }
        }
        app.globalData.myEquipment = eqList;
    }
});
