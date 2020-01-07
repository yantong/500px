export const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

export let getPicsByType = (data) => {
  try {
    let url = ' https://500px.me/'

    url = url + data.type
    
    if(JSON.stringify(data.params).length > 2)
      url += '?'

    for (const key in data.params) {
      if (data.params.hasOwnProperty(key)) {
        const value = data.params[key];

        url +=  key + '=' + value + '&'
      }
    }

    console.log(url);

    return new Promise((resolve,reject) => {
      wx.request({
        url: url.trim(),
        success (res) {
          resolve(res.data)
        },
        fail(event) {
          reject(event)
        }
      })
    })

  } catch (error) {
    return new Promise((resolve,reject) => {
      reject(error)
    })
  }
}