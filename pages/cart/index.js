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
    allChecked: false,
    totalPrice: 0,
    totalNum: 0
  },

  onShow() {
    // 获取缓存中的收货地址
    const address = wx.getStorageSync('address')
    const cart = wx.getStorageSync('cart') || [];
    // 计算全选
    // const allChecked = cart.length ? cart.every(v => v.checked) : false
    this.setData({
      address
    })
    this.setCart(cart)
  },

  // 获取收货地址
  async handleChooseAddress() {
    try {
      // 获取权限状态
      const res1 = await getSetting()
      const scopeAddress = res1.authSetting["scope.address"]
      // 判断权限状态
      if (scopeAddress === false) {
        await openSetting()
      }
      let address = await chooseAddress()
      address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo
      // 存入缓存中
      wx.setStorageSync('address', address)
    } catch (err) {
      console.error(err)
    }
  },
  // 商品的选中
  handleItemChange(e) {
    const goods_id = e.currentTarget.dataset.id
    // 获取购物车数组
    let {
      cart
    } = this.data
    // 找到被修改的商品对象
    let index = cart.findIndex(v => v.goods_id === goods_id)
    // 选中状态取反
    cart[index].checked = !cart[index].checked
    // 把购物车数据设置回data和缓存中
    this.setCart(cart)
  },
  // 重新计算底部任务的数据
  setCart(cart) {
    let allChecked = true
    // 总价格 总数量
    let totalPrice = 0
    let totalNum = 0
    cart.forEach(v => {
      if (v.checked) {
        totalPrice += v.num * v.goods_price
        totalNum += v.num
      } else {
        allChecked = false
      }
    })
    allChecked = cart.length != 0 ? allChecked : false
    this.setData({
      cart,
      totalPrice,
      totalNum,
      allChecked
    })
    wx.setStorageSync('cart', cart)
  },
  // 商品的全选功能
  handleItemAllChecked() {
    // 获取数据
    let {
      cart,
      allChecked
    } = this.data
    // 修改值
    allChecked = !allChecked
    // 循环修改cart的商品选中状态
    cart.forEach(v => v.checked = allChecked)
    // 把修改的值重新填充会data中或缓存中
    this.setCart(cart)
  },
  // 商品商量的编辑
  async handleItemNumEdit(e) {
    const {
      operation,
      id
    } = e.currentTarget.dataset
    let {
      cart
    } = this.data
    // 找到需要修改的商品的索引
    const index = cart.findIndex(v => v.goods_id === id)
    // 判断是否执行删除
    if (cart[index].num === 1 && operation === -1) {
      const res = await showModal({
        content: '你是否是要删除该商品'
      })
      if (res.confirm) {
        cart.splice(index, 1)
        this.setCart(cart)
      }
    } else {
      // 修改数量
      cart[index].num += operation
      // 设置回缓存中
      this.setCart(cart)
    }
  },
  // 点击结算
  async handlePay() {
    // 判断收货地址
    const {
      address,
      totalNum
    } = this.data
    if (!address.userName) {
      await showToast({
        title: '您还没有选择收货地址'
      })
      return
    }
    // 判断用户是否选中商品
    if (totalNum === 0) {
      await showToast({
        title: '您没有选购商品'
      })
      return
    }
    // 跳转到支付页面
    wx.navigateTo({
      url: '/pages/pay/index'
    })
  }
})