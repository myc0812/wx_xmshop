// pages/goods_detail/index.js
import {
  request
} from "../../request/index.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj: []
  },

  // 全局变量
  GoosInfo: [],

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {
      goods_id
    } = options
    this.getGoodsDetail(goods_id)
  },
  // 获取商品详情数据
  async getGoodsDetail(goods_id) {
    const res = await request({
      url: '/goods/detail',
      data: {
        goods_id
      }
    })
    this.GoosInfo = res.data.message
    this.setData({
      goodsObj: {
        goods_name: res.data.message.goods_name,
        goods_price: res.data.message.goods_price,
        // 苹果手机部分不识别webp格式

        goods_introduce: res.data.message.goods_introduce.replace(/\.webp/g, '.jpg'),
        pics: res.data.message.pics
      }
    })
  },
  // 点击预览大图
  handlePreviewImage(e) {
    // 先构造预览图片的数据
    const urls = this.GoosInfo.pics.map(v => v.pics_mid)
    // 接收传递过来的url
    const current = e.currentTarget.dataset.url
    wx.previewImage({
      current,
      urls
    });

  }
})