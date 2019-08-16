const app = getApp();
const request = require("../../utils/request");
const { $Toast } = require('../../dist/base/index');
const { $Message } = require('../../dist/base/index');
Page({
    /**
     * 页面的初始数据 
     */
    data: {
        wxRequestStatus: "",
        hidden:true,
        device: [],
        position: 'left',
        checked: false,
        current: [],
        returndevice:[],
        disabled: false,
        visible1: false,
        visible2: false,
        action:[
          {
            name: '确定',
          },
        ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        let that = this;
        this.recorderManager = wx.getRecorderManager();
        this.recorderManager.onError(() => {
            that.tip("录音失败！");
        });
        this.recorderManager.onStop(res => {
            that.setData({
                src: res.tempFilePath
            });
            console.log(res.tempFilePath);

            that.tip("录音完成！");
        });

        this.innerAudioContext = wx.createInnerAudioContext();
        this.innerAudioContext.onError(res => {
            that.tip("播放录音失败！");
        });
    },

    tip: msg => {
        wx.showModal({
            title: "提示",
            content: msg,
            showCancel: false
        });
    },

    //录制mp3音频
    startRecord: function() {
        console.log("按下手指了");
        this.recorderManager.start({
            format: "mp3"
        });
    },

    //停止录音
    stopRecord: function() {
        console.log("松开手指了");
        this.recorderManager.stop();
        // console.log(this.data.src);
    },

    // 播放录音
    playRecord: function() {
        let that = this;
        let src = this.data.src;
        if (src == "") {
            this.tip("请先录音！");
            return;
        }
        this.innerAudioContext.src = this.data.src;
        this.innerAudioContext.play();
    },
    // test
    // testSend: function() {
    //     request.post("api/semantic/setSemanticText", {
    //         text: "客厅吸顶灯亮度调到10%"
    //         // text: "把客厅的吸顶灯打开"
    //         // text:"请你打开客厅吸顶灯"
    //     });
    // },
  testSend: function () {
    let that = this;
    let header = header || {};
    let token = app.globalData.token;
    if (token) {
      header["Authorization"] = "Bearer " + token;
    }
    wx.request({
      url: app.globalData.serverUrl + "api/semantic/setSemanticText",
      header: header,
      data: { text: "客厅吸顶灯打开" },
      method: "POST",
      success: function (res) {
        // success
        if (res.data.response.data.length == 1){
          $Toast({
                content: res.data.response.information,
                type: 'success'
              });
        } else if (res.data.response.data.length > 1){
          let deviceArray = [];
          for (let i = 0, len = res.data.response.data.length;i < len; i++){
            let device = {};
            device.id = res.data.response.data[i];
            device.name = "客厅吸顶灯";
            device.action = res.data.response.action;
            device.status = res.data.response.status[i];
            deviceArray.push(device);
          }
          that.setData({
            device: deviceArray,
            hidden: false,
            visible1: true
         
          })
        } else if (res.data.response.data.length === 0){
          $Toast({
            content: res.data.response.information,
            type: 'error'
          });
        }
    
      },
      fail:function(res){},
      complete:function(){}
    });
  },
    /**长按页面跳转到语音识别模块 */
    toVoice: function() {
        console.log("asd");
        wx.navigateTo({
            url: "../voice/voice"
        });
    },
  handleDeviceChange({ detail = {} }) {
    const index = this.data.current.indexOf(detail.value);
    index === -1 ? this.data.current.push(detail.value) : this.data.current.splice(index, 1);
    this.setData({
      current:this.data.current
    });
  }, 
  handleClick:function(){
    let that = this;
    let arr = new Array();
    if(this.data.current.length == 0){
      $Toast({
        content:"请选择一个设备",
        type: 'success'
      });
    }else{
      for (let i of this.data.device){
        if (this.data.current.indexOf(i.id) !== -1 ){
          arr.push(i);
        }
      }
      
      let header = header || {};
      let token = app.globalData.token;
      let data = arr;
      if (token) {
        header["Authorization"] = "Bearer " + token;
      }
      wx.request({
        url: app.globalData.serverUrl + 'api/device/setManyDesired',
        data: data,
        header: header,
        method: 'POST',
        success: function(res) {
          $Toast({
            content: res.data.response.information,
            type: 'success'
          });
          that.setData({
            hidden: true
          })
        },
        fail: function(res) {
          console.log("失败")

        },
        complete: function(res) {},
      })
    }
   
  },





////////////////////////////////
  handleClickItem1({ detail }) {
    let that = this;
    let arr = new Array();
    if (this.data.current.length == 0) {
      $Toast({
        content: "请选择一个设备",
        type: 'success'
      });
    } else {
      for (let i of this.data.device) {
        if (this.data.current.indexOf(i.id) !== -1) {
          arr.push(i);
        }
      }

      let header = header || {};
      let token = app.globalData.token;
      let data = arr;
      if (token) {
        header["Authorization"] = "Bearer " + token;
      }
      wx.request({
        url: app.globalData.serverUrl + 'api/device/setManyDesired',
        data: data,
        header: header,
        method: 'POST',
        success: function (res) {
          // $Toast({
          //   content: res.data.response.information,
          //   type: 'success'
          // });
          $Message({
            content: res.data.response.information,
            type: 'success'
          });
          that.setData({
            hidden: true
          })
        },
        fail: function (res) {
          console.log("失败")

        },
        complete: function (res) { },
      })
    }

  },
//////////////////////////////////
  handleOpen1() {
    let that = this;
    let header = header || {};
    let token = app.globalData.token;
    if (token) {
      header["Authorization"] = "Bearer " + token;
    }
    wx.request({
      url: app.globalData.serverUrl + "api/semantic/setSemanticText",
      header: header,
      data: { text: "客厅吸顶灯关闭" },
      method: "POST",
      success: function (res) {
        // success
        if (res.data.response.data.length == 1) {
          $Message({
            content: res.data.response.information,
            type: 'success'
          });
        } else if (res.data.response.data.length > 1) {
          let deviceArray = [];
          for (let i = 0, len = res.data.response.data.length; i < len; i++) {
            let device = {};
            device.id = res.data.response.data[i];
            device.name = res.data.response.name[i];
            device.action = res.data.response.action;
            device.status = res.data.response.status[i];
            deviceArray.push(device);
          }
          that.setData({
            device: deviceArray,
            hidden: false,
            visible2: true

          })
        } else if (res.data.response.data.length === 0) {
          $Toast({
            content: res.data.response.information,
            type: 'error'
          });
        }

      },
      fail: function (res) { },
      complete: function () { }
    });


  },

  handleOK() {
    let that = this;
    let arr = new Array();
    if (this.data.current.length == 0) {
      $Toast({
        content: "请选择一个设备",
        type: 'success'
      });
    } else {
      for (let i of this.data.device) {
        if (this.data.current.indexOf(i.id) !== -1) {
          arr.push(i);
        }
      }

      let header = header || {};
      let token = app.globalData.token;
      let data = arr;
      if (token) {
        header["Authorization"] = "Bearer " + token;
      }
      wx.request({
        url: app.globalData.serverUrl + 'api/device/setManyDesired',
        data: data,
        header: header,
        method: 'POST',
        success: function (res) {
          // $Toast({
          //   content: res.data.response.information,
          //   type: 'success'
          // });
          $Message({
            content: res.data.response.information,
            type: 'success'
          });
          that.setData({
            visible2: false
          })
        },
        fail: function (res) {
          console.log("失败")

        },
        complete: function (res) { },
      })
    }
  
  },
  handleCancel() {
    this.setData({
      visible2: false
    });
  }
});
