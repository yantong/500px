import * as util from '../../utils/util'

let screenWidth = getApp().globalData.screenWidth

Component({
  properties: {
    type: String
  },
  data: {
    selTypes: ['community/search/set','community/discover/created_date'],

    page: 1,
    size: 5,
    showData: []
  },
  methods: {
    bottomUpdate() {
      let data = {}

      if(this.properties.type == 0)
        data = {
          page: this.data.page + 1,
          size: this.data.size,
          hasCover: 1,
          orderby: 'rating',
          type: 'json',
        }
      if(this.properties.type == 1)
        data = {
          page: this.data.page + 1,
          size: this.data.size,
          resourceType: 3,
          type: 'json',
        }

      util.getPicsByType({
        type: this.data.selTypes[this.properties.type],
        params: data
      }).then(res => {    
        if(this.properties.type == 0)
        {
          this.setData({
            showData: this.data.showData.concat(res.data.splice(0, this.data.size))
          })
        }
        else if(this.properties.type == 1)
          this.setData({
            showData: this.data.showData.concat(res || [])
          })    
      }).catch(error => {
        console.log(error);
      })

      this.setData({
        page: this.data.page + 1
      })
    }
  },
  lifetimes: {
    attached: function() {  
      let data = {}

      if(this.properties.type == 0)
        data = {
          page: this.data.page,
          size: this.data.size,
          hasCover: 1,
          orderby: 'rating',
          type: 'json',
        }
      if(this.properties.type == 1)
        data = {
          page: this.data.page,
          size: this.data.size,
          resourceType: 3,
          type: 'json',
        }

      util.getPicsByType({
        type: this.data.selTypes[this.properties.type],
        params: data
      }).then(res => {  
        if(this.properties.type == 0)
        {
          this.setData({
            showData: this.data.showData.concat(res.data.splice(0, this.data.size))
          })
        }
        else if(this.properties.type == 1)
          this.setData({
            showData: this.data.showData.concat(res || [])
          })
        
      }).catch(error => {
        console.log(error);
      })
    },
  },
})
