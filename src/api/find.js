import Taro from "@tarojs/taro";

let baseUrlDiscover = "https://500px.com.cn/community/discover";

export default {
  getRemen(page, pageSize) {
    return new Promise((resolve, reject) => {
      Taro.request({
        url: `${baseUrlDiscover}/rating?resourceType=0,2&category=&orderBy=rating&startTime=&page=${page}&size=${pageSize}&type=json`,
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
        url: `${baseUrlDiscover}/rankingRise?resourceType=0,2&startTime=&page=${page}&size=${pageSize}&type=json`,
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
    console.log("getXinzuo -- ");

    return new Promise((resolve, reject) => {
      Taro.request({
        url: `${baseUrlDiscover}/created_date?resourceType=0,2&startTime=&page=${page}&size=${pageSize}&type=json`,
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
        url: `${baseUrlDiscover}/recommendTime?resourceType=0,2,4&startTime=&page=${page}&size=${pageSize}&type=json`,
        success(res) {
          resolve(res);
        },
        fail(err) {
          reject(err);
        },
      });
    });
  },
  getYingji(page, pageSize) {
    console.log("getYingji -- ");
    return new Promise((resolve, reject) => {
      Taro.request({
        url: `https://500px.com.cn/community/search/set?hasCover=1&orderby=rating&page=${page}&size=${pageSize}&type=json`,
        success(res) {
          resolve(res);
        },
        fail(err) {
          reject(err);
        },
      });
    });
  },
  getZhuanlan(page, pageSize) {
    return new Promise((resolve, reject) => {
      Taro.request({
        url: `${baseUrlDiscover}/created_date?resourceType=3&page=${page}&size=${pageSize}&type=json`,
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
