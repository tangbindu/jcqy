
const matchRequest = require("../request/matchRequest.js");
// match.js
function Match(config) {
  //配置
  this.config = config || {};
  //赛事名字
  this.name = this.config.id || "赛事名字";
  //球队
  this.teams = this.config.teams || this.teams;
  //赛事球
  this._id = this.config._id || "赛事id";
  //球数
  this.ballNum = ["1", "2", "3", "4", "5", "6", "7+"];
  //赛事概率
  this.odds = this.config.odds || [0, 0, 0, 0, 0, 0, 0];
  //开始时间
  this.time = this.config.time || "";
  //分数
  this.score=this.config.score || "";
  // status==0 0赛事过去时 
  // status==1 1赛事一般时  
  // status==2 2赛事进行时 
  this.status= 1
}
Match.prototype = {
  //添加赛事
  add(config) {
  },
  //删除赛事
  delete(id) {
    return matchRequest.delete(this._id).then((res)=>{
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

  }
}
Match.read=function(){
  return matchRequest.read();
}

module.exports=Match;