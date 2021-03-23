Page({
  data: {
    tabs: [
      { id: 0, value: "综合", isActive: true },
      { id: 1, value: "销量", isActive: false },
      { id: 2, value: "价格", isActive: false },
    ],
  },

  onLoad: function (options) {
    console.log(options);
  },

  // 标题点击事件
  handleTabsItemChange(e) {
    // 获取被点击标题的索引
    const { index } = e.detail;
    // 修改原数组
    let { tabs } = this.data;
    tabs.forEach((v, i) =>
      i === index ? (v.isActive = true) : (v.isActive = false)
    );
    this.setData({
      tabs,
    });
  },
});
