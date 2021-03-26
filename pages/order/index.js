//Page Object
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
        value: "代付款",
        isActive: false,
      },
      {
        id: 2,
        value: "代发货",
        isActive: false,
      },
      {
        id: 3,
        value: "退款退货",
        isActive: false,
      }
    ]
  },

  onShow(options) {
    let pages = getCurrentPages()
    // 数组中索引最大的就是当前页面
    let currentPage = pages[pages.length - 1]
    // 获取参数
    const {
      type
    } = currentPage.options
    this.getOrders(type)
  },
  // 获取订单列表
  async getOrders(type) {
    const res = await request({
      url: "/my/orders/all",
      data: {
        type
      }
    })
    console.log(res)
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
});