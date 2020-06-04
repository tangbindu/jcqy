const bidRequest = require("../request/bidRequest.js");
//投注模块
function Bid(){
    this.config=config || {};
    this.userId=config.userId;
    this.matchId=config.matchId;
    this.bidTime=config.bidTime;
    this.customerBallNums=config.customerBallNums || [];
    this.customerBidAmount=config.customerBidAmount || [];
    this.optimazeBallNums=config.optimazeBallNums || [];
    this.optimazeBidAmount=config.optimazeBidAmount || [];
    this.optimazeBallNumsGoup=config.optimazeBallNumsGoup || [[],[]];
}
Bid.prototype = {
    //添加赛事
    add(config) {
      return bidRequest.add({
        matchId: this.name,
        customerBallNums: this.customerBallNums,
        customerBidAmount: this.customerBidAmount,
        optimazeBallNums: this.optimazeBallNums,
        optimazeBidAmount: this.optimazeBidAmount,
        optimazeBallNumsGoup: this.optimazeBallNumsGoup,
      }).then(() => {
        wx.showToast({
          title: '投注成功',
          icon: 'succes',
          duration: 1000,
          mask: false
        })
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
            matchId: this.name,
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


//mock数据
Bid.mock=function(match){
    return new Bid({
        userId:undefined,
        matchId:match._id,
        bidTime:new Date().getTime(),
        customerBallNums:["1","2","3","4"],
        customerBidAmount:[""],
        optimazeBallNums:[],
        optimazeBidAmount:[],
        optimazeBallNumsGoup:[[],[]],
    })
}

module.exports=Bid;
