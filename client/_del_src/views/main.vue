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
              class="text-left court-header primary darken-3"
            >Sports Centre</th>
            <th 
              v-for='i in 16' 
              :key='i' 
              class="text-center timeslot-header primary"
            >{{i+6}}</th>
          </tr>
        </thead>        
        <tbody>
          <tr v-for="crt in filteredCourtInfos" :key="crt._id">
            <td 
              class="text-left court-name"
              @click="courtOnClick(crt)"
            >
              {{ app.firstCharUpper(crt.venueDisplay) }}
            </td>
            <td v-for='i in 16' :key='i' class="text-center timeslot">
              {{ getAvailableCourtCount(crt.availbility, 'd' + app.selectedDate.value, 't' + (i+6)) }}
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
      // selectedDate: this.$root.$children[0].selectedDate,
      // availableArea: this.$root.$children[0].availableArea,
			imgUrl: require("../assets/img/main.jpg"),
			result: null,
			header: this.$t('main.header'),
			contact: this.$t('app.contact'),
			us: this.$t('app.us'),
			send: this.$t('app.send'),
			quote: this.$t('app.quote'),
			leaveMsg: this.$t('app.leaveMsg'),
			featuredItems: [
				{ src: require('../assets/img/featured1.jpg') },
				{ src: require('../assets/img/featured2.jpg') },
				{ src: require('../assets/img/featured3.jpg') },
				// { src: '../assets/img/featured4.jpg' }
			],
			whatsappUrl: 'https://api.whatsapp.com/send?phone=' + this.$t('whatsapp.phone') 
                    + '&text=' + this.$t('whatsapp.greeting'),
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

    this.getCourtInfos()

		this.app.showAd()
  },

  // watch: {
  //   'availableArea.selected': function (oldVal, newVal) {
  //     console.log(oldVal, newVal)
  //   }
  // },

  computed: {
    filteredCourtInfos: function () {
      console.log('*** filteredCourtInfos')
      console.log(this.app.selectedDistricts, this.app.selectedDate)
      return this.filterCourtInfos()
    }
  },  

	methods: {
    async getCourtInfos() {
      
      let lsCrtInfo = localStorage.getItem('courtInfos')

      if (lsCrtInfo != null) {
      this.courtInfos = JSON.parse(lsCrtInfo)
      console.log('%c load from local storage', 'background: red; color: white', this.courtInfos)
      } else {
        console.log('%c load from server', 'background: #222; color: #bada55')
        let response = await this.app.getDataFromDB('http://localhost:3000/courtinfos?sub=t&startDay=1&endDay=11')
        this.courtInfos = await this.getAvailbility(response.data)
        console.log('courtInfos', this.courtInfos)  
        localStorage.setItem('courtInfos', JSON.stringify(this.courtInfos))
      }
    },

    filterCourtInfos() {
      let selectedDistricts = this.app.selectedDistricts
      let result = []

      if (this.courtInfos != null) {

        result = this.courtInfos.filter((crt) => {
          if (selectedDistricts.includes(crt.areaVal))
            return true
          return false
        })

        console.log('filterCourtInfos', result)

      }

      return result
    },

    courtOnClick(crt) {
      var id = crt._id
			var path = `/bycourt/${id}`;
			console.log({path}, {crt});
			this.$router.push({path:path, query:{"crt":crt}});
    },

    getAvailableCourtCount(item, dt, time) {
      if (typeof item[dt] != 'undefined' && typeof item[dt][time] != 'undefined')
        return item[dt][time].cnt
      else
        return 0
    },

    getAvailbility(data) {
      const courts = data.slice()
      let availbility = {}
  
      courts.forEach((crt) => {
        crt.venueDisplay = crt.venueDisplay.toLowerCase().replace('sports centre', '')
        crt.availbility = {}
        crt.records.forEach((rec) => {          
          // console.log(rec)
          // crt.availbility.push({dateVal: rec.dateVal, timeslots: [{ts: 7, cnt: 2}, {ts: 8, cnt: 2}]})

          let dateValKey = 'd' + rec.dateVal.toString()

          if (typeof availbility[dateValKey] == 'undefined')
            availbility[dateValKey] = {}

          availbility[dateValKey].dateVal = rec.dateVal

          rec.timeslots.forEach((timeslot) => {
            // console.log(timeslot.status)
            let timeKey = 't' + timeslot.ts.toString()
            if (timeslot.status == '') {              
              if (typeof availbility[dateValKey][timeKey] == 'undefined') {
                availbility[dateValKey][timeKey] = {}
                availbility[dateValKey][timeKey].ts = timeslot.ts
                availbility[dateValKey][timeKey].cnt = 1
              }
              else
                availbility[dateValKey][timeKey].cnt ++
            } else {
              availbility[dateValKey][timeKey] = {}
              availbility[dateValKey][timeKey].ts = timeslot.ts
              availbility[dateValKey][timeKey].cnt = 0
            }
          })
        })
        crt.availbility = availbility
        // // console.log(availbility)
        availbility = {}
      })

      return courts
    },


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

.court-name, .court-header {
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

</style>