import Taro from "@tarojs/taro";

export default {
  getRemen() {
    return new Promise((resolve, reject) => {
      Taro.request({
        url: "https://500px.com.cn/community/discover/rating?resourceType=0,2&category=&orderBy=rating&photographerType=&startTime=&page=1&size=20&type=json",
        success(res) {
          resolve(res);
        },
        fail(err) {
          reject(err);
        },
      });
    });
  },
};
