// app.js
App({
  onLaunch() {
    console.log('每日晨间简报小程序启动')
    // 检查网络状态
    wx.getNetworkType({
      success(res) {
        console.log('网络类型：', res.networkType)
      }
    })
  },
  globalData: {
    // 数据API地址 - GitHub Pages 部署地址
    apiBaseUrl: 'https://du333du.github.io/morning-briefing-data',
    latestData: null
  }
})
