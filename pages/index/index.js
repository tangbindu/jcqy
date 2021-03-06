//index.js·
//获取应用实例
const app = getApp();
const Match = require('../../modules/match.js');
const { preHandleMatch } = require("../../utils/util.js");

Page({
  data: {
    //用户登录信息
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    /**
     * 我的投注数据
     */
    myBitData: {
      //头像
      avatar: null,
      //微信号
      wechatId: null,
      //手机号
      iphoneNumber: null,
      //最小投注
      minimumBid: 100, // 2元一注
      //投注窗口
      bidDialog : null,
      //投注历史
      bitHistory: [
        //投注的赛事
        {
          //赛事id
          matchId: null,
          //顾客计划投注
          customerPlan: {
            //ballNums
            ballNums: [1, 2, 3, 4],
            //投注金额
            bidAmount: [4, 5, 6, 7]
          },
          // 优化顾客计划投注
          optimazeCustomerPlan: {
            //ballNums
            ballNums: [1, 2, 3, 4],
            //投注金额
            bidAmount: [4, 5, 6, 7],
            //分组
            subGroup: {
              a: [1, 3],
              b: [2, 4],
            }
          }
        }
      ]
    },
    /**
     * 赛事数据
     * */
    matchList: [],
    /**
     * 投注金额
     * */
    amountList: [
      20,
      40,
      60,
      80,
      100,
      200,
      400,
      600,
      800,
      1000,
      2000,
      4000,
      10000,
    ],
    //投投注赛事
    bidMatch: null
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
  onReady: function(){
    this.bidDialog = this.selectComponent("#bidDialog");
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
  loadResource() {
    //赛事信息
    this.readMatch();
  },
  //投赛事
  bidMatchEvent(event) {
    this.bidDialog.setData({openid:app.globalData.openid})
    this.bidDialog.openDialog();
  },
  //读取赛事
  readMatch() {
    Match.read().then((result) => {
      //解决时间问题
      let ml = preHandleMatch(result.data)
      this.setData({ matchList: ml })
    });
  },
  //addMatch 模拟
  addMatch() {
    Match.mock().add().then(() => {
      this.loadResource();
    });
  },
  //deleteMatch 删除match
  deleteMatch() {
    new Match(this.data.matchList[0]).delete().then(() => {
      this.loadResource();
    });
  },
  //--------------------------bid赛事
  bidMatch() {

  }
})

