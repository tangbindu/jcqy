const bidRequest = require("../request/bidRequest.js");
//投注模块
function Bid(config){
    this.config=config || {};
    this.userid=this.config.userid || "";
    this.matchid=this.config.matchid || "";
    this.matchInfo=this.config.matchInfo || "";
    this.bidTime=this.config.bidTime || new Date().getTime();
    //用户选择的球
    this.customerBallNums=this.config.customerBallNums || [];
    //用户选择的金额
    this.customerBidAmount=this.config.customerBidAmount || [];
    //优化的金额
    this.optimazeBidAmount=this.config.optimazeBidAmount || [];
    //优化的组合
    this.optimazeBallNumsGoup=this.config.optimazeBallNumsGoup || [[],[]];
    //总金额
    this.totalAmount=this.config.totalAmount || 0;
    //总进球
    this.totalBallNum=this.config.totalAmount || 0;
}
Bid.prototype = {
    //添加赛事
    add(config) {
      wx.showLoading({
        title: '正在投注'
      })
      return bidRequest.add({
        userid: this.userid,
        matchInfo:this.matchInfo,
        matchid: this.matchid,
        // odds: this.odds,
        customerBallNums: this.customerBallNums,
        customerBidAmount: this.customerBidAmount,
        optimazeBidAmount: this.optimazeBidAmount,
        optimazeBallNumsGoup: this.optimazeBallNumsGoup,
        totalAmount: this.totalAmount
      }).then(() => {
        wx.hideToast()
        wx.showToast({
          title: '投注成功',
          icon: 'succes',
          duration: 1000,
          mask: true
        })
        setTimeout(()=>{
          wx.switchTab({
              url:"/pages/me/index"
          })
        },1000)
      })
    },
    //删除赛事
    delete(id) {
      return bidRequest.delete(this._id).then((res)=>{
        if(res.stats.removed>0){
          wx.showToast({
            title: '删除成功',
            icon: 'succes',
            duration: 1000,
            mask: false
          })
        }else{
          wx.showToast({
            title: '删除失败',
            icon: 'fail',
            duration: 1000,
            mask: false
          })
        }
      });
    },
    //更新赛事
    update() {
        bidRequest.add({
            matchid: this.name,
            customerBallNums: this.customerBallNums,
            customerBidAmount: this.customerBidAmount,
            optimazeBallNums: this.optimazeBallNums,
            optimazeBidAmount: this.optimazeBidAmount,
            optimazeBallNumsGoup: this.optimazeBallNumsGoup,
        }).then(() => {
            wx.showToast({
                title: '修改成功',
                icon: 'succes',
                duration: 1000,
                mask: false
            })
        })
    }
}

Bid.read=function(userid){
  return bidRequest.read(userid);
}
module.exports=Bid;
