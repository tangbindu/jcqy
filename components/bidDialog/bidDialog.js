
const Bid = require('../../modules/bid.js');
Component({
    /**
     * 组件的属性列表
     * 用于组件自定义设置
     */
    properties: {
      title:{
        type:String,
        default:"标题"
      },
      amountList:{
        type:Object,
        default:[]
      },
      match:{
        type:Object,
        default:{
        }
      }
    },
    /**
     * 私有数据,组件的初始数据
     * 可用于模版渲染
     */
    data: {
      openid:"",
      //弹窗
      showDialog:false,
      //选择的总进球
      chooseTotalBallNumList:[],
      //客户选择的球
      customerBallNums:[0,0,0,0,0,0,0,0],//负数表示没有,1表示投了
      //客户选择的金额
      customerBidAmount:[0,0,0,0,0,0,0,0],//0表示没有投
      //投注金额列表索引
      amountListIndex:0,
      //
      bid: null,
    },
    /**
     * 组件的方法列表
     * 更新属性和数据的方法与更新页面数据的方法类似
     */
    methods: {
      //选中一个总进球，执行一次
      chooseTotalBallNum(e){
        let num=e.currentTarget.dataset.num;//num序列号
        let numlist=this.data.chooseTotalBallNumList;
        if(!numlist.find(item=>item==num)){
          if(numlist.length>3){
            wx.showToast({
              title: '最多选4个',
              icon: 'none',
              duration: 1000,
              mask: false
            })
            return
          }
          numlist.push(num);
          this.setData({
            chooseTotalBallNumList:numlist
          })
        }else{
          numlist.forEach((element,index) => {
            if(element==num){
              numlist.splice(index,1)
            }
          });
          this.setData({
            chooseTotalBallNumList:numlist
          })
        }
        this.data.customerBallNums=[0,0,0,0,0,0,0,0];
        this.data.chooseTotalBallNumList.forEach(item=>{
            this.data.customerBallNums[item]=1
        })
        this.setData({customerBallNums:this.data.customerBallNums})
        //选择完毕
        this.data.bid.customerBallNums=this.data.customerBallNums;
        this.setData({bid:this.data.bid})
        //同步金额
        this.setCustomerBidAmount();
      },
      //投注金额索引
      bindPickerChange(e){
        this.setData({amountListIndex:e.detail.value})
        this.setCustomerBidAmount();
      },
      //设置投注金额
      setCustomerBidAmount(){
        this.data.customerBallNums.forEach((item,index)=>{
          if(item>0){
            this.data.customerBidAmount[index]=this.data.amountList[this.data.amountListIndex]/4
          }
        })
        this.setData({customerBidAmount:this.data.customerBidAmount})
      },
      //cancelBidDialog
      closeDialog() {
        this.setData({ 
          showDialog: false,
          customerBallNums: [0,0,0,0,0,0,0,0],
          chooseTotalBallNumList:[],
          bid:null
        })
      },
      //cancelBidDialog
      openDialog() {
        this.setData({ showDialog: true })
        let bid=new Bid({
          userid:this.data.openid,
          matchid: this.data.match.matchid
        });
        this.setData({
          bid:bid
        })
      },
      //确定投注
      comfirmBid(){
        this.data.bid.customerBallNums=this.data.customerBallNums;
        this.data.bid.customerBidAmount=this.data.customerBidAmount
        this.data.bid.userid=this.data.openid;
        this.data.bid.matchInfo=this.data.match.teams[0]+"VS"+this.data.match.teams[1];
        // this.data.bid.odds=this.data.match.odds;
        this.data.bid.totalAmount=this.data.amountList[this.data.amountListIndex];
        this.data.bid.add().then(()=>{
          setTimeout(()=>{
            this.closeDialog();
          },1000)
        });
      }
    }
  })