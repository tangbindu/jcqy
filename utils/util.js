const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
const formatTime1 = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return [month, day].map(formatNumber).join('/') + ' ' + [hour, minute].map(formatNumber).join(':')
}
const formatTime2 = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [hour, minute].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

//处理比赛时间
const preHandleMatch=(matchList)=>{
  matchList.forEach((element,index) => {
    matchList[index].ballNum=["0","1","2","3","4","5","6","7+"];
    if(matchList[index].score.length>0){
      let nums=matchList[index].score.split(":");
      matchList[index].total_balls=parseInt(nums[0])+parseInt(nums[1]);
    }
    if(element.score.length>0){
      // status==0 0赛事过去时 
      // status==1 1赛事一般时
      matchList[index].status=0
    }else{
      matchList[index].status=1;
    }
  });
  //排序
  matchList.sort(function(a,b){
    return parseInt(b.matchid)-parseInt(a.matchid)
  })
  return matchList
}



module.exports = {
  formatTime,
  preHandleMatch
}
