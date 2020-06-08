//index.js·
//获取应用实例
const app = getApp()
const Bid = require('../../modules/bid.js');
Page({
  data: {
    bid:null,
    openid:null,
    tableData: {
      tb:[
        ["12333","A组合","1球/3球","100","0"],
        ["12333","A组合","1球/3球","200","0"],
        ["12333","A组合","1球/3球","400","0"],
        ["12333","A组合","1球/3球","800","2000"],
      ]
    }
  },
  onShow: function () {
    //轮询拉openid
    let timmer=setInterval(()=>{
      if(app.globalData.openid){
        clearInterval(timmer)
        this.setData({openid:app.globalData.openid})
        Bid.read(this.data.openid).then(res=>{
          this.data.tableData.tb=res.data;
          this.setData({tableData:this.data.tableData})
        })
      }
    },100)
  }
})
