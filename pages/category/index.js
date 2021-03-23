import {
  request
} from "../../request/index.js";

Page({
  data: {
    // 左侧导航栏数据
    leftMenuList: [],
    // 右侧商品数据
    rightContent: [],
    // 被点击的左侧菜单
    currentIndex: 0,
    // 距离顶部的距离
    scrollTop: 0
  },
  // 接口的返回数据
  Cates: [],

  onLoad(options) {
    // 获取本地存储的数据
    const Cates = wx.getStorageSync('cates')
    // 判断
    if (!Cates) {
      this.getCates()
    } else {
      if (Date.now() - Cates.time > (1000 * 10)) {
        this.getCates()
      } else {
        this.Cates = Cates.data
        let leftMenuList = this.Cates.map(v => v.cat_name)
        let rightContent = this.Cates[0].children

        this.setData({
          leftMenuList,
          rightContent
        })
      }
    }
  },
  // 获取分类数据
  async getCates() {
    const res = await request({url: "/categories"})
    this.Cates = res.data.message;
    //将数据存入到本存储中
    wx.setStorageSync('cates', {
      time: Date.now(),
      data: this.Cates
    })

    let leftMenuList = this.Cates.map(v => v.cat_name)
    let rightContent = this.Cates[0].children

    this.setData({
      leftMenuList,
      rightContent
    })
},
// 左侧菜单的点击事件
handleItemTap(e)
{
  const {
    index
  } = e.target.dataset
  let rightContent = this.Cates[index].children
  this.setData({
    currentIndex: index,
    rightContent,
    // 重新设置view-scorll的距离顶部距离
    scrollTop: 0
  })
}
})
;
