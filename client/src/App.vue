<template>
  <v-app>
    <!--<n-side-menu 
      :filteredMenus="this.filteredMenus"
      :drawer="this.drawer"
      @toggleDrawer="this.toggleDrawer"
      @clicked="this.handleMenuClick"      
    />

    <n-top-bar
      ref="infoToolBar"
      :toolbar="this.toolbar"
      :infoToolBarIsHidden="this.infoToolBarIsHidden"
    />

    <n-menu-bar
      :filteredToolBarMenusLeft="this.filteredToolBarMenusLeft"
      :filteredToolBarMenusRight="this.filteredToolBarMenusRight"
      :infoToolBarIsHidden="this.infoToolBarIsHidden"
      :title="this.toolbar.title"
      :toggleDrawer="this.toggleDrawer"
      @clicked="this.handleMenuClick"
    />-->

    <n-menu-bar       
      :pSelectedDate="this.selectedDate"
      :pAvailableArea="this.availableArea"
      :pForceReload="this.forceReload"
      @filterDateChanged="this.changeDate"
      @filterAreaChanged="this.changeArea"
      @forceReloadChanged="this.changeForceReload"
    />

    <v-content>
      <!-- pop-up dialog -->
      <v-dialog v-model="dialog.show"
        :width="dialog.width" 
        :scrollable="dialog.scrollable"
      >
        <component :is="dialog.content"></component>
      </v-dialog>

      <!-- Snack Bar -->
      <v-snackbar
        :timeout="snackbar.timeout"
        :top="true"
        v-model="snackbar.show"
      >
      {{snackbar.msg}}
      <v-btn text class="pink--text" @click.native="snackbar.show = false">Close</v-btn>
      </v-snackbar>

      <router-view :key="$route.fullPath"/>
    </v-content>
    <!-- <n-footer></n-footer> -->
  </v-app>
</template>

<script>
import Vue from 'vue'
import Firebase from 'firebase'

import TopBar from '@/components/top-bar'
import MenuBar from '@/components/menu-bar'
import Footer from '@/components/footer'
import SideMenu from '@/components/side-menu'
import SignUp from '@/components/signup'
import Login from '@/components/login'

Vue.component("n-top-bar", TopBar)
Vue.component("n-side-menu", SideMenu)
Vue.component("n-menu-bar", MenuBar)
Vue.component("n-footer", Footer)
Vue.component("signup", SignUp)
Vue.component("login", Login)

export default {
  name: 'app',
  data() {
    return {
      smAndDown: false,
      selectedDate: {text:null, value:null},
      selectedDistricts: [],
      availableArea: [],
      forceReload: false,
      toolbar: { 
        infoToolBarIsHidden: false,
        infoToolBarIsOffScreen: false,
        title: this.$t('app.company.name'),
      },
      drawer: false,
      snackbar: {
        show: false,
        msg: '...',
        timeout: 2000
      },
      dialog: {
        show: false,
        content: '',
        scrollable: false,
        width: 0
      },
      menus: [
        { title: this.$t('app.menu.home'), to: '/', icon: 'fas fa-home' },           
        { title: this.$t('app.menu.service'), to: '/service', icon: 'fas fa-tools' },
        { title: this.$t('app.menu.flow'), to: '/flow', icon: 'fas fa-list-ol' },
        { title: this.$t('app.menu.quote'), to: '/quote', icon: 'fas fa-comments-dollar' },
        { title: this.$t('app.menu.aboutus'), to: '/aboutus', icon: 'fas fa-address-card' },
        { 
          menuPos: 'right',
          startDivider: true,
          title: this.$t('app.login'), 
          to: null, icon: 'mdi-fingerprint', 
          dialog: {
            page:'login', 
            width: "30%"
          }, 
          click: this.openDialog, showOnLogged: false 
        },
        { 
          menuPos: 'right',
          endDivider: true,
          title: this.$t('app.signup'), to: null, icon: 'mdi-person',
          dialog: { 
            page:'signup', 
            width: "30%"
          }, 
          click: this.openDialog,
          showOnLogged: false,
        },        
        // { 
        //   menuPos: 'right',
        //   startDivider: true,
        //   endDivider: true,
        //   title: 'Logout', 
        //   to: null, 
        //   icon: 'exit_to_app', 
        //   dialog: null, 
        //   click:this.logout,
        //   showOnLogged: true
        // },      
      ]
    }
  },

  computed: {
    user() {
      return this.$store.state.user
    },
    err() {
      return this.$store.state.err
    },
    msg() {
      return this.$store.state.msg
    },
    langField: function() {
      if (this.$i18n.locale == 'zhHant')
        return 'Chi'
      else // default is english
        return ''
    }
    
    // infoToolBarIsHidden() {
    //   // console.log('reload computed')
    //   return this.$vuetify.breakpoint.smAndDown || this.toolbar.infoToolBarIsOffScreen
    // },
    // filteredMenus() {
    //   return this.menus.filter((menu) => {
    //             return menu.showOnLogged == (this.user != null) || typeof menu.showOnLogged === 'undefined'
    //           }) 
    // },
    // filteredToolBarMenusLeft() {
    //   return this.filteredMenus.filter((menu) => {
    //             return !menu.menuPos || menu.menuPos == 'left' 
    //           })       
    // },
    // filteredToolBarMenusRight() {
    //   return this.filteredMenus.filter((menu) => {
    //             return menu.menuPos == 'right'
    //           })       
    // }
  },

  watch: {
    err(value) {
      if(value != null) {
        this.showSnackbar('Error: ' + value.msg, 5000)
        this.$store.dispatch('setErr', null)
      }
    },
    msg(value) {
      if(value != null) {
        this.showSnackbar(value.msg, 3000)
        this.$store.dispatch('setMsg', null)
      }
    },
  },

  mounted() {
    //var width = window.innerWidth || document.body.clientWidth

    //if (width <= 600) {
      //this.menus[2].dialog.fullscreen = true
      //this.menus[3].dialog.fullscreen = true
    //}

    //// console.log(this.menus[2])

    //this.$root.$app = this;
    //// console.log("App", this.$data)
    //alert(window.innerWidth || document.body.clientWidth)
  },

  created() {
    var vm = this

    //// console.log('this', this)
    // console.log('created', this)
    window.addEventListener('scroll', this.handleScrolling)

    // this.$store.dispatch('retrieveCars')

    // // *** NEED TO UNCOMMENT LATER ***
    // Firebase.auth().onAuthStateChanged(function(user) {
    //   console.log('onAuthStateChanged', user)
    //   if (user) {
    //     user = Firebase.auth().currentUser
    //     vm.$store.dispatch('getUserProfile', user)
    //   } else {
    //     // No user is signed in.
    //     // console.log('logout')
    //     vm.$store.dispatch('setUser', null)
    //   }

    //   //vm.$emit('userStatusChanged', event)
    // })
  },     

  methods: {
    pad(word, size) {
      var s = String(word);
      while (s.length < (size || 2)) {s = "0" + s;}
      return s;
    },

    capitalize(s) {
      if (typeof s !== 'string') return ''
      return s.charAt(0).toUpperCase() + s.slice(1)
    },

    firstCharUpper(s) {
      if (typeof s !== 'string') return ''
      let strArray = s.split(' ')
      s = ''
      strArray.forEach((str) => {
        str = this.capitalize(str)
        s = s + str + ' '
      })

      return s.trim()
    },

    dateDisplay(d) {
      // console.log('dateDisplay', d.substring(0,4) + '/' + d.substring(4,6) + '/' + d.substring(6,8))
      return d.substring(6,8) + '/' + d.substring(4,6) + '/' + d.substring(0,4)
    },

    async getDataFromDB(url) {
      // let me = this

      let response = await this.$http.get(url,{
        headers: {
          'Access-Control-Allow-Origin': '*',
        }
      })	  
      // console.log('response', response)

      return response
    },

    changeForceReload(value) {
      this.forceReload = value
    },

    changeDate(date) {
      console.log('main changeDate', date.text)
      this.selectedDate.text = date.text
      this.selectedDate.value = date.value
      // this.selectedDate = date
    },

    changeArea(availableArea) {
      // console.log('main changeArea')
      this.availableArea = availableArea
      
      this.selectedDistricts = []
      this.availableArea.forEach((area) => {
        this.selectedDistricts = [...this.selectedDistricts, ...area.selectedDistricts]
      })

    },

    async getCourtInfos(forceFetch) {
      
      let lsCrtInfos = localStorage.getItem('courtInfos')
      let lsCrtInfosLastFetchTime = localStorage.getItem('courtInfosLastFetchTime')
      let diffSec = (new Date() - new Date(Date.parse(lsCrtInfosLastFetchTime))) / 1000  
      let result = []
      
      // Force fetch new data from server after 15 mins from last fetch time
      if (lsCrtInfos != null && diffSec <= (60 * 30) && (!forceFetch || (forceFetch && diffSec <= 30))) {
        // this.courtInfos = JSON.parse(lsCrtInfos)
        console.log('%c load from local storage', 'background: red; color: white')
        result = JSON.parse(lsCrtInfos)
        
      } else {
        console.log('%c load from server', 'background: green; color: #bada55')
        // let response = await this.getDataFromDB('http://localhost:3000/courtinfos/5d774c207d6e7099e683daf9?sub=t&startDay=10&endDay=11')
        // const curDate = this.$moment(new Date()).format('YYYY/MM/DD')

        // const response = await this.getDataFromDB(`${process.env.VUE_APP_REST_API_URL}/courtinfos?sub=t&startDay=0&endDay=10`)
        const response = await this.getDataFromDB(`${process.env.VUE_APP_REST_API_URL}/session`)
        console.log(response)
        // this.courtInfos = await this.getAvailbility(response.data)
        const courtInfos = await this.getAvailbility(response.data)
        // console.log('courtInfos ********', courtInfos)
        localStorage.setItem('courtInfosLastFetchTime', new Date())
        localStorage.setItem('courtInfos', JSON.stringify(courtInfos))

        result = courtInfos
      }

      result.forEach((crt) => {
        Object.keys(crt.availbility).forEach((ava) => {
          let conVenueCnt = 0
          let timeslots = crt.availbility[ava]

          // if (crt.venueDisplay2 != 'Tsing Yi' || crt.availbility[ava].dateVal != '20210825')
          //   return
          
          // console.log('***', crt.venueDisplay2, crt.availbility[ava], timeslots)

          let tmpTimeslots = ['t22','t21','t20','t19','t18','t17','t16','t15','t14','t13','t12','t11','t10','t09','t08','t07']
                    
          // Object.keys(timeslots).slice().reverse().forEach((ts) => {
          tmpTimeslots.forEach((ts) => {
            let cTS = timeslots[ts]
            if (cTS && typeof cTS.ts != 'undefined') {
              if (cTS.cnt > 0) {

                
                // console.log('|' + cTS.ts + '|', parseInt(cTS.ts))
                // let pTS = timeslots['t' + (parseInt(cTS.ts) + 1)]
                
                // cTS.crtNos.forEach((crtNo) => {
                //   // let pCrtNo = {}
                //   if (pTS && pTS.crtNos) {
                //     let pCrtNo = pTS.crtNos.filter((item) => {
                //       return item.courtName == crtNo.courtName
                //     })[0]

                //     // if (ts == 't17'){ 
                //     //   console.log(timeslots.dateVal, ts, pTS, crtNo, pCrtNo, pCrtNo['conCnt'], pCrtNo.courtName)
                //     // }

                //     if (pCrtNo && pCrtNo['conCnt']) {
                //       crtNo['conCnt'] = 1 + pCrtNo['conCnt']
                //       crtNo.conCnt = 1 + pCrtNo.conCnt
                //     } else {
                //       crtNo.conCnt = 1
                //     }
                    
                //   } else {
                //     crtNo.conCnt = 1
                //   }

                //   if (typeof cTS['conCrtCnt'] == 'undefined' || cTS.conCrtCnt < crtNo['conCnt']) {
                //     cTS['conCrtCnt'] = crtNo['conCnt']
                //   }
                // })
                
                cTS.conVenueCnt = 1
                cTS.conVenueCnt += conVenueCnt
                conVenueCnt++
              } else {
                conVenueCnt = 0
              }
            }
          })
        })
      })

      return result
    },    

    getAvailbility(data) {
      const courts = data.slice()
      let availbility = {}
      let crtNo = ''
  
      console.log('getAvailbility')
      courts.forEach((crt) => {
        console.log(crt)
        crt.venue_enName = crt.venue_enName.replace(/sports centre/ig, '').trim()
        crt.venue_tcName = crt.venue_tcName.replace('體育館', '').trim()
        crt.venue_scName = crt.venue_scName.replace('体育馆', '').trim()
        crt.availbility = {}

        crt.sessions.forEach((rec) => {    
          // if (rec.courtName.indexOf("Facility/Court No.") >= 0) {
          //   crtNo = rec.courtName.replace(/Facility\/Court No./ig, '').trim()
          //   // if (crtNo != 'A' && crtNo != 'B')
          //   //   console.log(crtNo, rec.courtName)
          // } else {
          //   crtNo = 'A'
          //   console.log('%c Error: court no. is invalid', 'background: red; color: white')
          // }
            
          // crt.availbility.push({dateVal: rec.dateVal, timeslots: [{ts: 7, cnt: 2}, {ts: 8, cnt: 2}]})

          let dateValKey = 'd' + rec.ssn_StartDate.toString().substring(0, 10).replace(/-/ig, '')
          let timeKey = 't' + rec.ssn_StartTime.toString().substring(0,2)

          if (typeof availbility[dateValKey] == 'undefined')
            availbility[dateValKey] = {}

          availbility[dateValKey].dateVal = rec.ssn_StartDate

          if (typeof availbility[dateValKey][timeKey] == 'undefined')
            availbility[dateValKey][timeKey] = {ts: timeKey, cnt: rec.ssn_cnt, available: rec.available}

          // let sortedTS = rec.timeslots.sort((a,b) => {
          //   return a.ts - b.ts
          // })

          // sortedTS.forEach((timeslot) => {
          //   // console.log(timeslot.status)
          //   let timeKey = 't' + timeslot.ts.toString()
          //   if (timeslot.status == '') {
          //     if (typeof availbility[dateValKey][timeKey] == 'undefined')
          //       availbility[dateValKey][timeKey] = {ts: timeslot.ts, cnt: 0, crtNos: []}

          //     availbility[dateValKey][timeKey].cnt += 1

          //     if (typeof availbility[dateValKey][timeKey].crtNos != 'undefined')
          //       availbility[dateValKey][timeKey].crtNos.push({courtName: crtNo})

          //   } //else {
          //     // availbility[dateValKey][timeKey] = {ts: timeslot.ts, cnt: 0, crtNos: []}
          //   // }
          // })
        })
        crt.availbility = availbility
        // // console.log(availbility)
        availbility = {}
      })

      return courts
    },  

    toggleDrawer(value) {
      if (typeof value != 'undefined')
        this.drawer = value
      else
        this.drawer = !this.drawer
    },

    handleScrolling() {
      let element = this.$refs.infoToolBar
      let offScreen = false

      if (typeof element != 'undefined') {
        var rect = element.$el.getBoundingClientRect()    
        offScreen = rect.bottom < 0
        // console.log(rect.top, rect.right, rect.bottom, rect.left, offScreen)
      }
      
      if (this.toolbar.infoToolBarIsOffScreen != offScreen)
        this.toolbar.infoToolBarIsOffScreen = offScreen
    },

    showAd() {
      if ( window.plugins && window.plugins.AdMob ) {
        window.plugins.AdMob.interstitial.prepare();
      }
    },      
    leadingZero(num, size) {
      var s = num+"";

      while (s.length < size)
        s = "0" + s

      return s;
    },
    getWeekday(d) {
      var tmp = d.split('/');
      var dt = new Date(tmp[2] + '-' + tmp[1] + '-' + tmp[0]);
      var weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

      return weekday[dt.getDay()];
    },
    getImgUrl(no) {
      if (no.length == 1 || no < 10)
        no = "0" + no
      return "http://bet.hkjc.com/marksix/info/images/icon/no_" + no + "_s.gif"
    },
    handleMenuClick(funcCall, menu) {
      // console.log("parent handleMenuClick")
      this.drawer = false

      if (funcCall === null || typeof funcCall === 'undefined')
        return

      funcCall(menu)
    },

    /*signout() {      
      Firebase.auth().signOut().then(function() {
        // Sign-out successful.
      }).catch(function(error) {
        // An error happened.
      })
    },*/

    // logout() {
    //   this.$store.dispatch('userLogout')
    // },

    showSnackbar(msg, timeout) {
      this.snackbar.show = true
      this.snackbar.msg = msg

      if (timeout > 2000 )
        this.snackbar.timeout = timeout
      else
        this.snackbar.timeout = 2000
    },

    closeDialog() {
      this.dialog.show = false;
    },

    openDialog(menu) {
      if (menu.dialog == null || typeof menu.dialog === 'undefined')
        return

      this.dialog.content = menu.dialog.page

      var width = this.$vuetify.breakpoint.smAndDown ? '100%' : menu.dialog.width || '70%'
      this.dialog.width = width

      var scrollable = menu.dialog.scrollable
      if (scrollable == null)
        scrollable = false

      this.dialog.scrollable = scrollable

      // var width = window.innerWidth || document.body.clientWidth
      // this.dialog.fullscreen = width <= 600

      // this.dialog.fullscreen = this.$vuetify.breakpoint.smAndDown 
      
      var vm = this

      setTimeout(function(){
        vm.dialog.show=true
      }, 1)
    }
  }

}
</script>

<style>

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* //text-align: center; */
  /* color: #2c3e50; */
  color: #2c3e50;
}

.center-container {
	/* border: 5px solid green; */
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
}

.centered {
  margin: 0 auto;
}

@media screen and (min-width: 677px) and (max-width: 1424px) {
  /* .v-toolbar--absolute+main, .v-toolbar--fixed+main {
    padding-top: 48px !important;
  } */
}

/* .v-toolbar--absolute+main, .v-toolbar--fixed+main {
  padding-top: 49px !important; 
} */

/* .v-toolbar, .v-toolbar__content {
  height: 48px !important;
} */

.v-toolbar__title {
  margin-left: 0px !important;
}

.car-list > a.list__tile {
  /* margin-left: 0px !important;
  padding-left: 1px !important; */
}

.link {
  cursor: pointer;
}

div.v-dialog {
  margin: 12px;
}

.info-icon {
  margin-right: .5em;
  color: inherit;
}

.app-title {
  color: #37474F
}

.footer {
  padding: 1em;
}

.v-btn {
  text-transform:none !important;
}

.fa-google {
  background: conic-gradient(from -45deg, #ea4335 110deg, #4285f4 90deg 180deg, #34a853 180deg 270deg, #fbbc05 270deg) 73% 55%/150% 150% no-repeat;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
}

.modal-actions {
  padding-left: 1em; 
  padding-bottom: 1em;
}

.icon-with-text {
  margin: 0 .5em;
}

/* .vertical-center {
  margin: 0;
  position: absolute;
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
} */

.pointer-link { 
  cursor: pointer;
  color:  var(--v-secondary-base);
} 


</style>
