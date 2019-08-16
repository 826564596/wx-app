// pages/register/register.js
const app = getApp();
Page({
    /**
     * 页面的初始数据
     */
    data: {
        userName: "",
        userEmail: "",
        Password: "",
        verificationCode: ""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {},

    /**
     * 获取用户名
     */
    getuserName: function(e) {
        this.data.userName = e.detail.value;
        console.log(this.data.userName);
    },

    /**
     * 获取邮箱
     */
    getuserEmail: function(e) {
        this.data.userEmail = e.detail.value;
        console.log(this.data.userEmail);
    },

    /**
     * 获取密码
     */
    getPassword: function(e) {
        this.data.password = e.detail.value;
        console.log(this.data.password);
    },

    /**
     * 获取用户输入的验证码
     */
    getgetVerificationCode: function(e) {
        this.data.verificationCode = e.detail.value;
        console.log(this.data.verificationCode);
    },

    /**
     * 从后台发送验证码给用户邮箱
     */
    getVerificationCodeFromServer: function(e) {},

    /**
     * 注册 
     */
    register: function(e) {
    }
});
