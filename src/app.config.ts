export default {
  // 主包
  pages: [
    // 首页
    "pages/tab-bar/home/index",
    // 我的
    "pages/tab-bar/mine/index"
  ],
  // 子包
  subpakages: [
    // 子包：module1
    {
      root: 'pages/module1/',
      pages: [
        "page1/index",
        "page2/index"
      ]
    },
    // 子包：module2
    {
      root: 'pages/module2/',
      pages: [
        "page1/index",
        "page2/index"
      ]
    }
  ],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black",
  },
};
