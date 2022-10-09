// pages/shopList/shopList.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        query:[],
        shopList:[],
        page:1,
        limit:10,
        // 总数
        count:0,
        // 节流阀
        isLoading:false
    },

    getShopList(refresh){
        wx.showLoading({
          title: '加载中...',
        })
        this.setData({
            isLoading:true
        })
        wx.request({
          url: `https://www.escook.cn/categories/${this.data.query.id}/shops`,
          data:{
              _page:this.data.page,
              _limit:this.data.limit
          },
          success:res=>{
              console.log(res);
              this.setData({
                  shopList:[...this.data.shopList,...res.data],
                  count:res.header['X-Total-Count']
              })
          },
          complete:()=>{
              wx.hideLoading()
              this.setData({
                  isLoading:false
              })
            //  关闭刷新
            refresh && refresh()
          }
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            query:options
        })
        this.getShopList()
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        // 修改导航栏标题
        wx.setNavigationBarTitle({
          title: this.data.query.name,
        })
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
        // 下拉刷新
        // 1、重置data中的数据，重新获取第一页数据，总数count归0
        this.setData({
            page:1,
            shopList:[],
            count:0
        })
        // 重新获取数据，传递参数，关闭刷新
        this.getShopList(()=>wx.stopPullDownRefresh())
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        // 判断节流阀是否处于打开状态
        if(this.data.isLoading) return 
        if(this.data.shopList.length=== +this.data.count){
            wx.showToast({
              title: '没有更多了...',
              icon:'none'
            })
        }else{
            this.setData({
                page:this.data.page+1
            })
            this.getShopList()
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})