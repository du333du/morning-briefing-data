// pages/detail/detail.js
const localData = require('../../utils/localData.js')
const app = getApp()

Page({
  data: {
    moduleId: 0,
    moduleName: '',
    itemCount: 0,
    items: [],
    noData: false
  },

  onLoad(options) {
    const id = parseInt(options.id) || 1
    // 先尝试从globalData获取，如果没有则使用本地数据
    const modules = app.globalData.latestData?.modules || localData.modules
    const mod = modules.find(m => m.id === id)

    if (mod) {
      wx.setNavigationBarTitle({ title: mod.name })
      this.setData({
        moduleId: id,
        moduleName: mod.name,
        itemCount: mod.count || (mod.items ? mod.items.length : 0),
        items: mod.items || []
      })
    } else {
      this.setData({ noData: true })
    }
  },

  openLink(e) {
    const url = e.currentTarget.dataset.url
    if (url) {
      wx.setClipboardData({
        data: url,
        success() {
          wx.showToast({ title: '链接已复制', icon: 'success' })
        }
      })
    }
  }
})
