
const matchRequest = require("../request/matchRequest.js");
// match.js
function Match(config) {
  //配置
  this.config = config || {};
  //赛事名字
  this.name = this.config.name || "赛事名字";
  //球队
  this.teams = this.config.teams || this.teams;
  //赛事球
  this.id = this.config.id || "赛事id"
  //球数
  this.ballNum = this.config.ballNum || ["1", "2", "3", "4", "5", "6", "7+"]
  //赛事概率
  this.odds = this.config.odds || [0, 0, 0, 0, 0, 0, 0];
  //开始时间
  this.startTime = this.config.startTime || new Date().getTime();
  //结束时间
  this.endTime = this.config.endTime || new Date().getTime();
  // status==0 0赛事过去时 
  // status==1 1赛事一般时  
  // status==2 2赛事进行时 
  this.status= this.status || 1
}
Match.prototype = {
  //添加赛事
  add(config) {
    return matchRequest.add({
      name: this.name,
      teams: this.teams,
      ballNum: this.ballNum,
      odds: this.odds,
      startTime: this.startTime,
      endTime: this.endTime,
      status: this.status
    }).then(() => {
      wx.showToast({
        title: '添加模拟赛事成功',
        icon: 'succes',
        duration: 1000,
        mask: false
      })
    })
  },
  //删除赛事
  delete(id) {

  },
  //更新赛事
  update() {

  }
}
Match.read=function(){
  return matchRequest.read();
}
//mock数据
Match.mock=function(){
  // 名字
  let teamNames = [
    "皇家马德里",
    "拜仁慕尼黑",
    "尤文图斯",
    "巴塞罗那",
    "切尔西",
    "曼城",
    "马德里竞技",
    "巴黎圣日耳曼",
    "罗马和多特蒙德",
    "意甲拉齐奥",
    "巴甲科林蒂安",
    "阿甲博卡青年",
    "比甲布鲁日",
    "法甲波尔多",
    "英超西汉姆联"
  ];
  let a = Math.floor(Math.random() * 14);
  let b = Math.floor(Math.random() * 14);
  b = a == b ? ++b : b;
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
  let startTime = null;
  let endTime = null;
  startTime = new Date();
  startTime.setDate(startTime.getDate() + Math.floor(Math.random() * 10));
  endTime = new Date(startTime.getTime() + 120 * 60 * 1000);
  return new Match({
    id: undefined,
    name: undefined,
    ballNum: undefined,
    startTime: startTime,
    endTime: endTime,
    teams: twoTeams,
    odds: odds,
    status: 1
  })
}

module.exports=Match;