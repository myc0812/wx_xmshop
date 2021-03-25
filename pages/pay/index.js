// pages/cart/index.js
import {
  getSetting,
  chooseAddress,
  openSetting,
  showModal,
  showToast
} from "../../utils/asyncWX.js";

Page({

  data: {
    address: {},
    cart: [],
    totalPrice: 0,
    totalNum: 0
  },

  onShow() {
    // 获取缓存中的收货地址
    const address = wx.getStorageSync('address')
    let cart = wx.getStorageSync('cart') || []
    // 过滤后的购物车数组
    cart = cart.filter(v => v.checked)
    // 总价格 总数量
    let totalPrice = 0
    let totalNum = 0
    cart.forEach(v => {
      totalPrice += v.num * v.goods_price
      totalNum += v.num
    })
    this.setData({
      cart,
      totalPrice,
      totalNum,
      address
    })
  }
})