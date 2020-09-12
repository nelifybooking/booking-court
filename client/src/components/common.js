import storage from './firebase-storage'

export default {
  data() {
    return {
      app: this.$root.$children[0]
    }    
  },

  methods: {
    capitalize(s) {
      if (typeof s !== 'string') return ''
      return s.charAt(0).toUpperCase() + s.slice(1)
    },
    loadDataFromServer(key) {
      let lastUpdate = localStorage.getItem(key)

      var lastUpdateDt = new Date(lastUpdate)
      var d = new Date()
      var today = new Date(d.getFullYear(), d.getMonth(), d.getDate())

      // console.log(today, lastUpdateDt)

      return today > lastUpdateDt
    },
    setLastUpdateDt(key) {
      let dt = new Date()

      let yr = dt.getFullYear()
      let mth = dt.getMonth()+1
      let d = dt.getDate()

      if (mth.length < 2)
        mth = "0" + mth
      
      if (d.length < 2)
        d = "0" + d

      let today = yr + "-" + mth + "-" + d

      localStorage.setItem(key, today)
    },
    getImageUrl:function(img) {
      if (img !== '') {
        return new Promise(function (resolve, reject) {
          storage.ref("images").child(img).getDownloadURL()
            .then((url) => {
              resolve(url)
            })
            .catch((error) => {
              if (error.code === 'storage/object-not-found') {
                storage.ref("images/image-not-found.png").getDownloadURL()
                .then((url) => {
                  resolve(url)               
                })
                .catch((error) => {
                  reject(error)
                })
              }
              else 
                reject(error)
            })
        })
      }
    }
  }
}