// 赛事相关的请求
let db = getApp().db;
const matchRequest = {
  //读取100条
  read(){
    return new Promise((resolve, reject) => {
      db.collection('matchData').limit(100).get().then((result)=>{
        resolve(result)
      })
    })
  },
  //添加赛事
  add(param={}){
    //查一个增长编号
    //增长号等于name
    return new Promise((resolve, reject) => {
      db.collection('matchData').add({
        data: {
          name:param.name || "赛事编号",
          start_time: param.start_time || new Date(),
          end_time:param.end_time || new Date(),
          teams:param.teams || ["无名","无名"],
          odds:param.odds || ['0.0','0.0','0.0','0.0','0.0','0.0','0.0','0.0'],
          total_balls:param.totalBalls || '',
        },
        success: function (res) {
          resolve(res)
        }
      })
    })
  },
  //添加赛事结果
  update(param={}){
    return new Promise((resolve, reject) => {
      db.collection('matchData').add({
        data: {
          name:param.name || "赛事编号",
          start_time: param.start_time || new Date(),
          end_time:param.end_time || new Date(),
          teams:param.teams || ["无名","无名"],
          odds:param.odds || ['0.0','0.0','0.0','0.0','0.0','0.0','0.0','0.0'],
          total_balls:param.totalBalls || '',
        },
        success: function (res) {
          resolve(res)
        }
      })
    })
  }
}
module.exports = matchRequest;

