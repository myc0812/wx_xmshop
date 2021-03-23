import {
  request
} from "../../request/index.js";

Page({
  data: {
    tabs: [{
        id: 0,
        value: "综合",
        isActive: true,
      },
      {
        id: 1,
        value: "销量",
        isActive: false,
      },
      {
        id: 2,
        value: "价格",
        isActive: false,
      },
    ],
    goodsList: [],
  },

  // 接口要的参数
  queryParms: {
    query: "",
    cid: "",
    pagenum: 1,
    pagesize: 10,
  },
  // 总页数
  totalPage: 1,

  onLoad: function (options) {
    this.queryParms.cid = options.cid;
    this.getGoodsList()

    wx.showLoading({
      title: '加载中',
    })

    setTimeout(() => {
      wx.hideLoading();
    }, 2000)

  },

  // 获取商品列表数据
  async getGoodsList() {
    const res = await request({
      url: "/goods/search",
      data: this.queryParms
    });
    // 获取总条数
    const total = res.data.message.total
    // 总页数
    this.totalPage = Math.ceil(total / this.queryParms.pagesize)
    this.setData({
      goodsList: [...this.data.goodsList, ...res.data.message.goods]
    })
    wx.stopPullDownRefresh();
  },

  // 标题点击事件
  handleTabsItemChange(e) {
    // 获取被点击标题的索引
    const {
      index
    } = e.detail;
    // 修改原数组
    let {
      tabs
    } = this.data;
    tabs.forEach((v, i) =>
      i === index ? (v.isActive = true) : (v.isActive = false)
    );
    this.setData({
      tabs,
    });
  },

  // 页面上滑 滚动条触地事件
  onReachBottom() {
    if (this.queryParms.pagenum >= this.totalPage) {
      wx.showToast({
        title: '我是有底线的哦'
      });

    } else {
      this.queryParms.pagenum++
      this.getGoodsList()
    }
  },
  // 下拉刷新事件
  onPullDownRefresh() {
    // 重置数组
    this.setData({
      goodsList: []
    })
    // 2 重置页码
    this.queryParms.pagenum = 1;
    // 3 发送请求
    this.getGoodsList();
  }
});