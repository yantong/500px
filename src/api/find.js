import Taro from "@tarojs/taro";

let baseUrl = "https://500px.com.cn/community/discover";

export default {
  getRemen(page, pageSize) {
    return new Promise((resolve, reject) => {
      Taro.request({
        url: `${baseUrl}/rating?resourceType=0,2&category=&orderBy=rating&startTime=&page=${page}&size=${pageSize}&type=json`,
        success(res) {
          resolve(res);
        },
        fail(err) {
          reject(err);
        },
      });
    });
  },
  getPaiming(page, pageSize) {
    return new Promise((resolve, reject) => {
      Taro.request({
        url: `${baseUrl}/rankingRise?resourceType=0,2&startTime=&page=${page}&size=${pageSize}&type=json`,
        success(res) {
          resolve(res);
        },
        fail(err) {
          reject(err);
        },
      });
    });
  },
  getXinzuo(page, pageSize) {
    return new Promise((resolve, reject) => {
      Taro.request({
        url: `${baseUrl}/created_date?resourceType=0,2&startTime=&page=${page}&size=${pageSize}&type=json`,
        success(res) {
          resolve(res);
        },
        fail(err) {
          reject(err);
        },
      });
    });
  },
  getTuijian(page, pageSize) {
    return new Promise((resolve, reject) => {
      Taro.request({
        url: `${baseUrl}/recommendTime?resourceType=0,2,4&startTime=&page=${page}&size=${pageSize}&type=json`,
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
