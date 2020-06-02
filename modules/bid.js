//投注模块
function Bid(){
    this.config=config || {};
    this.matchId=config.matchId;
    this.customerBallNums=config.customerBallNums || [];
    this.customerBidAmount=config.customerBidAmount || [];
    this.optimazeBallNums=config.optimazeBallNums || [];
    this.optimazeBidAmount=config.optimazeBidAmount || [];
    this.optimazeBallNumsGoup=config.optimazeBallNumsGoup || [[],[]];
}
module.exports=Bid;
