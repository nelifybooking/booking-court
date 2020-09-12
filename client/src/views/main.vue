<template>
	<div>
    <!-- Display available time slot --> 
    <v-simple-table
      dense      
      v-if="app.selectedDate.text"
    >
      <template v-slot:default>
        <!--<thead>
          <tr>
            <th class="text-left timeslot-header"></th>
            <th class="text-center" colspan="6">am</th>
            <th class="text-center" colspan="11">pm</th>
          </tr>
        </thead>-->
        <thead>
          <tr>
            <th 
              class="text-center white--text table-court-header primary darken-1"
            >
              {{$t('main.col1Header')}}
            </th>
            <th 
              v-for='i in 16' 
              :key='i' 
              class="text-center white--text timeslot-header primary"
            >{{i+6}}</th>
          </tr>
        </thead>        
        <tbody>
          <!-- <tr><td>{{new Date()}}</td></tr> -->
          <tr v-for="(crt, row) in filteredCourtInfos" :key="crt._id">
            <td 
              class="text-center table-court pointer-link"
              @click="courtOnClick(crt)"
            >
              {{ app.firstCharUpper(crt['venueDisplay2' + app.langField]) }}
            </td>
            <td 
              v-for='i in 16' :key='i' 
              class="text-center timeslot"
              :class="{ 
                'grey lighten-2': getAvailableTSCnt(crt.availbility, 'd' + app.selectedDate.value, 't' + (i+6), 'cnt') > 0 && row % 2 == 0,
                'grey lighten-1': getAvailableTSCnt(crt.availbility, 'd' + app.selectedDate.value, 't' + (i+6), 'cnt') > 0 && row % 2 != 0,
                'ts-con-crt-gte2': getAvailableTSCnt(crt.availbility, 'd' + app.selectedDate.value, 't' + (i+6), 'conCrtCnt') == 2,
                'ts-con-crt-gte3': getAvailableTSCnt(crt.availbility, 'd' + app.selectedDate.value, 't' + (i+6), 'conCrtCnt') > 2
              }"
            >
              {{ getAvailableTSCnt(crt.availbility, 'd' + app.selectedDate.value, 't' + (i+6), 'cnt') == 0 ? '-' : getAvailableTSCnt(crt.availbility, 'd' + app.selectedDate.value, 't' + (i+6), 'cnt')}}
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
	</div>
</template>

<script>
import Vue from 'vue'
// import db from '../components/firebase-db'
// import common from '../components/common';

export default {
	data() {
		return {
			app: this.$root.$children[0],
      // forceReload: this.$root.$children[0].forceReload,
      // selectedDate: this.$root.$children[0].selectedDate,
      // availableArea: this.$root.$children[0].availableArea,
			imgUrl: require("../assets/img/main.jpg"),
			result: null,
			// header: this.$t('main.header'),
			// contact: this.$t('app.contact'),
			// us: this.$t('app.us'),
			// send: this.$t('app.send'),
			// quote: this.$t('app.quote'),
			// leaveMsg: this.$t('app.leaveMsg'),
			// featuredItems: [
			// 	{ src: require('../assets/img/featured1.jpg') },
			// 	{ src: require('../assets/img/featured2.jpg') },
			// 	{ src: require('../assets/img/featured3.jpg') },
			// 	// { src: '../assets/img/featured4.jpg' }
			// ],
			// whatsappUrl: 'https://api.whatsapp.com/send?phone=' + this.$t('whatsapp.phone') 
      //               + '&text=' + this.$t('whatsapp.greeting'),
      courtInfos: [],
      // filteredCourtInfos:[],
      // tmpCourtInfos: [],
      // selectedDate: {},
      // selectedArea: [],
      // selectedCourt: [],
      // availableDate: [],
      // availableArea: [],
      // items: [],
      // district: [],
      // switchOn: false,
      // tags: [
      //   {text: 'a', selected: false},
      //   {text: 'b', selected: false},
      //   {text: 'c', selected: false},
      // ],
      message: null,
      // districtMenu: false
		}
	},
  
	created: function () {
		// var me = this;

		// let loadResultFromServer = common.methods.loadDataFromServer("resultLastUpdate")
    // console.log("TCL: loadResultFromServer", loadResultFromServer)

		// this.getResults(loadResultFromServer)

    // this.getAvailableDays(11)
    // let response = await this.getDataFromDB('http://localhost:3000/courtinfos/5d774c1f7d6e7099e683dae2?sub=t&startDay=1&endDay=11')


    // this.courtInfos.forEach((court)=> {
    //   for (var i=7; i<23; i++) {
    //     if (typeof court.availbility['d20200702']['t'+i] == 'undefined')
    //       console.log(i, court)
    //   }
    // })

    // console.log('currentLang', this._i18n.locale)
    this.getCourtInfoOnCreated(false)
		this.app.showAd()
  },

  watch: {
    'forceReload': function (newVal, oldVal) {      
      if (newVal == true) {
        // console.log('watch forceReload', oldVal, newVal)
        this.app.changeForceReload(false)
        this.getCourtInfoOnCreated(true)
      }
    }
  },

  computed: {
    filteredCourtInfos: function () {
      // console.log('*** filteredCourtInfos')
      // console.log(this.app.selectedDistricts, this.app.selectedDate)
      return this.filterCourtInfos()
    },
    forceReload: function() {
      // console.log('computed forceReload')
      return this.app.forceReload
    }
  },  

	methods: {
    async getCourtInfoOnCreated(force) {
      this.courtInfos = await this.app.getCourtInfos(force)
    },

    // async getCourtInfos(forceFetch) {
      
    //   let lsCrtInfos = localStorage.getItem('courtInfos')
    //   let lsCrtInfosLastFetchTime = localStorage.getItem('courtInfosLastFetchTime')
    //   let diffSec = (new Date() - new Date(Date.parse(lsCrtInfosLastFetchTime))) / 1000

    //   // Force fetch new data from server after 15 mins from last fetch time
    //   if (lsCrtInfos != null && diffSec <= (60 * 30) && !forceFetch) {
    //     // this.courtInfos = JSON.parse(lsCrtInfos)
    //     return JSON.parse(lsCrtInfos)
    //     // console.log('%c load from local storage', 'background: red; color: white', this.courtInfos)
    //   } else {
    //     console.log('%c load from server', 'background: #222; color: #bada55')
    //     let response = await this.app.getDataFromDB('http://localhost:3000/courtinfos?sub=t&startDay=0&endDay=11')
    //     // this.courtInfos = await this.getAvailbility(response.data)
    //     let courtInfos = await this.getAvailbility(response.data)
    //     console.log('courtInfos ********', courtInfos)
    //     localStorage.setItem('courtInfosLastFetchTime', new Date())
    //     localStorage.setItem('courtInfos', JSON.stringify(courtInfos))

    //     return courtInfos
    //   }
    // },

    filterCourtInfos() {
      let selectedDistricts = this.app.selectedDistricts
      let result = []

      console.log('filterCourtInfos', this.courtInfos)

      if (this.courtInfos != null) {

        result = this.courtInfos.filter((crt) => {
          if (selectedDistricts.includes(crt.areaVal))
            return true
          return false
        })

        result.forEach((crt) => {
          Object.keys(crt.availbility).forEach((ava) => {
            let conVenueCnt = 0
            let timeslots = crt.availbility[ava]
            
            Object.keys(timeslots).slice().reverse().forEach((ts) => {
              let cTS = timeslots[ts]              
              if (typeof cTS.ts != 'undefined') {
                if (cTS.cnt > 0) {
                  // console.log('|' + ts + '|')
                  let pTS = timeslots['t' + (parseInt(cTS.ts) + 1)]
                  
                  cTS.crtNos.forEach((crtNo) => {
                    // let pCrtNo = {}
                    if (pTS && pTS.crtNos) {
                      let pCrtNo = pTS.crtNos.filter((item) => {
                        return item.courtName == crtNo.courtName
                      })[0]

                      // if (ts == 't17'){ 
                      //   console.log(timeslots.dateVal, ts, pTS, crtNo, pCrtNo, pCrtNo['conCnt'], pCrtNo.courtName)
                      // }

                      if (pCrtNo && pCrtNo['conCnt']) {
                        crtNo['conCnt'] = 1 + pCrtNo['conCnt']
                        crtNo.conCnt = 1 + pCrtNo.conCnt
                      } else {
                        crtNo.conCnt = 1
                      }
                      
                    } else {
                      crtNo.conCnt = 1
                    }

                    if (typeof cTS['conCrtCnt'] == 'undefined' || cTS.conCrtCnt < crtNo['conCnt']) {
                      cTS['conCrtCnt'] = crtNo['conCnt']
                    }
                  })
                  
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

        console.log('filterCourtInfos2', result)
      }

      return result
    },

    courtOnClick(crt) {
      var id = crt._id
			var path = `/bycourt/${id}`;
			// console.log({path}, {crt});
			this.$router.push({path:path, query:{"crt":crt}});
    },

    getAvailableTSCnt(item, dt, time, cntField) {
      // console.log('getAvailableTSCnt', dt)

      if (typeof item[dt] != 'undefined' && typeof item[dt][time] != 'undefined')
        return item[dt][time][cntField]
      else
        return 0
    },

    // getAvailbility(data) {
    //   const courts = data.slice()
    //   let availbility = {}
  
    //   courts.forEach((crt) => {
    //     crt.venueDisplay = crt.venueDisplay.toLowerCase().replace('sports centre', '')
    //     crt.availbility = {}
    //     crt.records.forEach((rec) => {          
    //       // console.log(rec)
    //       // crt.availbility.push({dateVal: rec.dateVal, timeslots: [{ts: 7, cnt: 2}, {ts: 8, cnt: 2}]})

    //       let dateValKey = 'd' + rec.dateVal.toString()

    //       if (typeof availbility[dateValKey] == 'undefined')
    //         availbility[dateValKey] = {}

    //       availbility[dateValKey].dateVal = rec.dateVal

    //       rec.timeslots.forEach((timeslot) => {
    //         // console.log(timeslot.status)
    //         let timeKey = 't' + timeslot.ts.toString()
    //         if (timeslot.status == '') {              
    //           if (typeof availbility[dateValKey][timeKey] == 'undefined') {
    //             availbility[dateValKey][timeKey] = {}
    //             availbility[dateValKey][timeKey].ts = timeslot.ts
    //             availbility[dateValKey][timeKey].cnt = 1
    //           }
    //           else
    //             availbility[dateValKey][timeKey].cnt ++
    //         } else {
    //           availbility[dateValKey][timeKey] = {}
    //           availbility[dateValKey][timeKey].ts = timeslot.ts
    //           availbility[dateValKey][timeKey].cnt = 0
    //         }
    //       })
    //     })
    //     crt.availbility = availbility
    //     // // console.log(availbility)
    //     availbility = {}
    //   })

    //   return courts
    // },


		// getResults(loadFromServer) {
		// 	var me = this;

		// 	if (loadFromServer) {
		// 		db.ref("results").once('value')
		// 			.then((data) => {	        
		// 				me.result = data.val()	
		// 				localStorage.setItem("results", JSON.stringify(me.result))
		// 				common.methods.setLastUpdateDt("resultLastUpdate")

		// 				me.result = me.result.filter((item) => {
		// 					return item.uid > me.result.length  - 1
		// 				});
		// 			})
		// 	} else {
		// 		// Load from local storage
		// 		me.result = JSON.parse(localStorage.getItem("results"))
		// 		me.result = me.result.filter((item) => {
		// 			return item.uid > me.result.length  - 1
		// 		});
		// 	}
		// },	
	}
}

</script>


<style>

/* .large-screen-carousel {
	padding-bottom: 0em; 
} */

/** {
  -webkit-text-size-adjust: none;
}*/

.main-parallex-header {
	background-color: rgba(0,0,0,.4); 
	width: auto; 
	padding: 5px 20px;
	margin: 0 auto;
}

.table-court, .table-court-header, .table-date {
  padding: 3px 3px !important;
  min-width: 15px;
  font-size: 11px !important;
}

.timeslot-header, .timeslot {
  padding: 1px 1px !important;
  min-width: 15px;
  font-size: 11px !important;  
}

.area {
  font-size: 16px;
  font-weight: bold;
}

tbody tr:nth-of-type(odd) {
  background-color: rgba(0, 0, 0, .05);
}

.ts-con-crt-gte2 {
  color: #F57F17
  /* text-decoration: underline; */
}

.ts-con-crt-gte3 {
  color:#43A047;
  /* text-decoration: underline; */
}

</style>