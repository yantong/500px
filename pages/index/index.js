import * as util from '../../utils/util'

Page({
  data: {
    titles: ['热门','排名上升','新作','编辑推荐','影集','图文'],
    seled: 0,
  },
  selTitle(event) {
    this.setData({
      seled: event.target.dataset.index
    })
  },
  onLoad() {
  }
})