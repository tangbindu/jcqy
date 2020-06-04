// 赛事相关的请求
let MyApp;
if(typeof getApp==="undefined"){
  MyApp=function(){
    return {db:{
      collection:function(){}
    }}
  }
}else{
  MyApp=getApp;
}
//兼容处理
let db = MyApp().db;
const bidRequest = {
  //读取100条
  read(){
    return new Promise((resolve, reject) => {
      db.collection('bidData').limit(100).get().then((result)=>{
        resolve(result)
      })
    })
  },
  //添加赛事
  add(param={}){
    param.userId=MyApp.globalData.openid;
    //查一个增长编号
    //增长号等于name
    return new Promise((resolve, reject) => {
      db.collection('bidData').add({
        data: param,
        success: function (res) {
          resolve(res)
        }
      })
    })
  },
  //添加赛事结果
  update(param={}){
    return new Promise((resolve, reject) => {
      db.collection('bidData').add({
        data: param,
        success: function (res) {
          resolve(res)
        }
      })
    })
  },
  //删除
  delete(id){
    return db.collection('bidData').where({
      _id: id
    }).remove()
  }
}
module.exports = bidRequest;

