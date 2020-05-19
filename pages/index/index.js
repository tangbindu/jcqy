//index.js·
//获取应用实例
const app = getApp();
const matchRequest = require("../../request/matchData.js");
const {handleMatchTime} = require("../../utils/util.js");

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    //投中的赛事
    bidMatch:null,
    //赛事列表
    matchList: [
      //  0过去时 1一般时 2进行时
    ],
    balls:[ "0", "1", "2", "3", "4", "5", "6", "7+"]
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    //用户信息
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    //加载资源
    this.loadResource();
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  //加载资源
  loadResource(){
    //赛事信息
    this.readMatch();
  },
  //投赛事
  bidMatchEvent(event){
    this.setData({bidMatch:event.currentTarget.dataset.match})
  },
  //cancelBidDialog
  cancelBidDialog(){
    this.setData({bidMatch:null})
  },
  //读取赛事
  readMatch(){
    matchRequest.read().then((result)=>{
      //解决时间问题
      let ml=handleMatchTime(new Date(),result.data)
      this.setData({matchList:ml})
    });
  },
  //addMatch 模拟
  addMatch() {
    // 名字
    let teamNames = ["皇家马德里", "拜仁慕尼黑", "尤文图斯", "巴塞罗那", "切尔西", "曼城", "马德里竞技", "巴黎圣日耳曼", "罗马和多特蒙德", "意甲拉齐奥", "巴甲科林蒂安", "阿甲博卡青年", "比甲布鲁日", "法甲波尔多", "英超西汉姆联"];
    let a=Math.floor(Math.random() * 14);
    let b=Math.floor(Math.random() * 14);
    b= a==b? ++b : b;
    let twoTeams = [
      teamNames[a],
      teamNames[b]
    ]
    // 概率
    let odds = [
      (Math.random() * 8).toFixed(1),
      (Math.random() * 8).toFixed(1),
      (Math.random() * 8).toFixed(1),
      (Math.random() * 8).toFixed(1),
      (Math.random() * 8).toFixed(1),
      (Math.random() * 8).toFixed(1),
      (Math.random() * 8).toFixed(1),
      (Math.random() * 8).toFixed(1)
    ]
    //时间
    let start_time = null;
    let end_time = null;
    start_time = new Date();
    start_time.setDate(start_time.getDate() + Math.floor(Math.random() * 10))
    end_time = new Date(start_time.getTime() + 120 * 60 * 1000)
    //请求吧
    matchRequest.add({
      start_time: start_time,
      end_time: end_time,
      teams: twoTeams,
      odds: odds,
    }).then(() => {
      wx.showToast({
        title: '添加模拟赛事成功',
        icon: 'succes',
        duration: 1000,
        mask: false
      })
      this.loadResource();
    })
  }
})

