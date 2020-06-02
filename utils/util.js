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
const handleMatchTime=(currentTime,matchList)=>{
  currentTime=new Date(currentTime).getTime();
  matchList.forEach((match)=>{
    //  0过去时 1一般时 2进行时
    if(currentTime<new Date(match.startTime).getTime()){
      //没开始
      match.status=1;
    }else if(currentTime>new Date(match.endTime).getTime()){
      //结束了
      match.status=0;
      //测试数据，一定要删下面一行
      match.total_balls=Math.floor(Math.random()*8)
    }else{
      //进行时
      match.status=2;
    }
    match.startTime=formatTime1(new Date(match.startTime))
    match.endTime=formatTime2(new Date(match.endTime))
  })
  matchList.sort((a,b)=>{
    return new Date(b.startTime).getTime()-new Date(a.startTime).getTime();
  })
  return matchList
}



module.exports = {
  formatTime,
  handleMatchTime
}
