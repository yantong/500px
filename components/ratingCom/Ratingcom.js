import * as util from '../../utils/util'

let screenWidth = getApp().globalData.screenWidth

Component({
  properties: {
    type: String
  },
  data: {
    imags: [],
    imgStyles: [],
    page: 1,
    size: 30,
    imgHeight: 120.0,
    lastSize:[],
    selTypes: ['discover/rating','community/discover/rankingRise','community/discover/created_date',
    'community/discover/recommendTime','community/search/set','community/discover/created_date'],
  },
  methods: {
    resizePic(res) {      
      if(this.properties.type == 1  || this.properties.type == 2 || this.properties.type == 3)
        res.data = res
      
      if(!res.data || res.data.length === 0)
        return 

      let widths = res.data.map(item => { 
        return item.width * this.data.imgHeight / item.height
      })      
      let imags = res.data.map(item => { 
        return item.url.baseUrl + '!p4'
      })

      


      let beginIndex = 0,lastTotalWidth = 0
      let imgStyles = this.data.imgStyles      

      if(this.data.lastSize.length) {
        for (let index = 0; index < this.data.lastSize.length; index++) {
          const width = this.data.lastSize[index];
          lastTotalWidth += width
        }

        
        for (let idx = beginIndex;; idx++) {
          if(idx >= widths.length)
            break ;

          lastTotalWidth += widths[idx]
          

          if(lastTotalWidth >= screenWidth)
          {

            let ratio = (screenWidth * 1.0)/(lastTotalWidth - widths[idx])

            for (let index = 0; index < this.data.lastSize.length; index++) {
              const width = this.data.lastSize[index]*ratio;

              imgStyles[imgStyles.length - this.data.lastSize.length  + index] = `width:${width}px;height: 100px`
            }
            
            for (let index = 0; index < idx; index++) {
              const width = widths[index]*ratio;

              imgStyles.push(`width:${width}px;height: 100px`)
            }

            beginIndex = idx

            break;
          }
        }

      }
      
      let index = beginIndex,totalWidth = 0

      widths.forEach((item,index2) => {
        if(index2 < beginIndex)
          return 

        totalWidth += item
        if(totalWidth >= screenWidth)
        {
          let ratio = (screenWidth * 1.0)/(totalWidth - item)
          
          for (let idx = index; idx < index2; idx++) {
            const width = widths[idx]*ratio;

            imgStyles.push(`width:${width}px;height: 100px`)
          }

          totalWidth = item
          index = index2
        }
      })

      let lastSize = []
      for (let idx = index; idx < widths.length; idx++) {
        lastSize.push(widths[idx])
        imgStyles.push(`width:${widths[idx]}px;height: 100px`)
      }

      this.setData({
        imags: this.data.imags.concat(imags),
        imgStyles,
        lastSize
      })
    },
    bottomUpdate() {
      let data = {}

      if(this.properties.type == 0)
        data = {
          page: this.data.page + 1,
          size: this.data.size,
          resourceType: '0,2',
          category: 0,
          type: 'json',
          orderBy: 'rating',
          category: ''
        }
      else if(this.properties.type == 1  || this.properties.type == 2 || this.properties.type == 3)
        data = {
          page: this.data.page + 1,
          size: this.data.size,
          resourceType: '0,2',
          startTime: '',
          type: 'json'
        }


      util.getPicsByType({
        type: this.data.selTypes[this.properties.type],
        params: data
      }).then(res => {        
        this.resizePic(res)
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
          resourceType: '0,2',
          category: 0,
          type: 'json',
          orderBy: 'rating',
          category: ''
        }
        else if(this.properties.type == 1  || this.properties.type == 2 || this.properties.type == 3)
          data = {
            page: this.data.page,
            size: this.data.size,
            resourceType: '0,2',
            startTime: '',
            type: 'json'
          }

      util.getPicsByType({
        type: this.data.selTypes[this.properties.type],
        params: data
      }).then(res => {  
        this.resizePic(res)
      }).catch(error => {
        console.log(error);
      })
    },
  },
})
