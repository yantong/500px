export default defineAppConfig({
  pages: [
    "pages/find/index",
    "pages/photographer/index",
    "pages/tribe/index",
    "pages/activity/index",
  ],
  tabBar: {
    color: "#fff",
    selectedColor: "#000",
    backgroundColor: "#fff",
    borderStyle: "black",
    list: [
      {
        pagePath: "pages/find/index",
        text: "",
        iconPath: "assets/img/find.png",
        selectedIconPath: "assets/img/find_sel.png",
      },
      {
        pagePath: "pages/photographer/index",
        text: "",
        iconPath: "assets/img/photographer.png",
        selectedIconPath: "assets/img/photographer_sel.png",
      },
      {
        pagePath: "pages/tribe/index",
        text: "",
        iconPath: "assets/img/tribe.png",
        selectedIconPath: "assets/img/tribe_sel.png",
      },
      {
        pagePath: "pages/activity/index",
        text: "",
        iconPath: "assets/img/activity.png",
        selectedIconPath: "assets/img/activity_sel.png",
      },
    ],
  },
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black",
  },
});
