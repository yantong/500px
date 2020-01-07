//app.js
App({
  onLaunch() {
    this.globalData.screenWidth =  wx.getSystemInfoSync().screenWidth
  },
  globalData: {
    screenWidth: 0
  }
})