// pages/index/index.js
const localData = require('../../utils/localData.js')
const app = getApp()

Page({
  data: {
    dateStr: '',
    weekDay: '',
    updateTime: '',
    modules: [],
    loading: false,
    errorMsg: '',
    useLocalData: false
  },

  onLoad() {
    this.setToday()
    // 先使用本地数据，再尝试网络请求
    this.loadLocalData()
    setTimeout(() => {
      this.fetchData()
    }, 500)
  },

  onShow() {
    // 每次显示页面时刷新数据
    if (app.globalData.latestData) {
      this.processData(app.globalData.latestData)
    }
  },

  onPullDownRefresh() {
    this.fetchData().then(() => {
      wx.stopPullDownRefresh()
    })
  },

  setToday() {
    const now = new Date()
    const y = now.getFullYear()
    const m = String(now.getMonth() + 1).padStart(2, '0')
    const d = String(now.getDate()).padStart(2, '0')
    const weekDays = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六']
    this.setData({
      dateStr: `${y}-${m}-${d}`,
      weekDay: weekDays[now.getDay()]
    })
  },

  loadLocalData() {
    // 先加载本地示例数据，确保页面有内容显示
    this.processData(localData)
    this.setData({ useLocalData: true })
  },

  processData(d) {
    if (!d || !d.modules) return
    this.setData({
      dateStr: d.date || this.data.dateStr,
      updateTime: d.updateTime || '',
      weekDay: d.weekDay || this.data.weekDay,
      modules: d.modules || [],
      useLocalData: false,
      errorMsg: ''
    })
    app.globalData.latestData = d
  },

  fetchData() {
    this.setData({ loading: true, errorMsg: '' })
    const that = this

    return new Promise((resolve) => {
      const apiUrl = app.globalData.apiBaseUrl
      // 如果没有配置API地址，跳过网络请求
      if (!apiUrl) {
        that.setData({ loading: false })
        resolve()
        return
      }

      const fullUrl = apiUrl + '/morning_briefing_latest.json'
      
      wx.request({
        url: fullUrl,
        method: 'GET',
        success(res) {
          if (res.statusCode === 200 && res.data) {
            that.processData(res.data)
          } else {
            console.log('使用本地数据（网络请求失败）')
          }
        },
        fail(err) {
          console.log('网络请求失败，使用本地数据', err)
        },
        complete() {
          that.setData({ loading: false })
          resolve()
        }
      })
    })
  },

  goDetail(e) {
    const id = e.currentTarget.dataset.id
    const mod = this.data.modules.find(m => m.id === id)
    if (mod && mod.hasNews) {
      wx.navigateTo({
        url: `/pages/detail/detail?id=${id}`
      })
    } else {
      wx.showToast({ title: '暂无新消息', icon: 'none' })
    }
  }
})
