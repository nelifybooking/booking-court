<template>
  <div>    
    <v-expansion-panels>
      <v-expansion-panel class="primary white--text">
        <v-expansion-panel-header disable-icon-rotate>
          <template v-slot:actions>
            <v-icon color="white">mdi-information-outline</v-icon>
          </template>
          {{app.firstCharUpper(app.langField === 'Chi' ? crt.venue_tcName : crt.venue_enName)}}
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-list dense>
            <v-list-item-group color="primary">
              <v-list-item>
                <v-list-item-icon>
                  <v-icon >mdi-map-marker</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="crt['address' + app.langField]"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon >mdi-phone</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="crt.phone"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <v-simple-table
      dense      
      v-if="id"
    >
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-center white--text court-header primary darken-1">
              {{$t('byCourt.col1Header')}}</th>
            <th 
              v-for='i in 16' 
              :key='i' 
              class="text-center white--text timeslot-header primary"
            >{{i+6}}</th>
          </tr>
        </thead>        
        <tbody>
          <!-- <tr><td>{{new Date()}}</td></tr> -->
          <!-- <tr v-for="(rc, row) in Object.keys(crt.availbility)" :key="row"> -->
          <tr v-for="rc in dateList" :key="rc">
            <td 
              class="text-center table-date pointer-link"
              @click="dateOnClick(crt.availbility[rc], rc)"
            >
              <!-- {{app.dateDisplay(crt.availbility[rc].dateVal)}} -->
              {{app.dateDisplay(rc.replace('d',''))}}              
            </td>
            <td 
              v-for='i in 16' 
              :key='i' 
              class="text-center timeslot"
              :class="{ 
                'grey lighten-2': getAvailableTSCnt(crt.availbility, rc, 't' + (i+6), 'cnt') > 0 && row % 2 == 0,
                'grey lighten-1': getAvailableTSCnt(crt.availbility, rc, 't' + (i+6), 'cnt') > 0 && row % 2 != 0,
                'ts-con-crt-gte2': getAvailableTSCnt(crt.availbility, rc, 't' + (i+6), 'conCrtCnt') == 2,
                'ts-con-crt-gte3': getAvailableTSCnt(crt.availbility, rc, 't' + (i+6), 'conCrtCnt') > 2,
              }"              
            >
              {{ getAvailableTSCnt(crt.availbility, rc, 't' + (i+6), 'cnt') }}
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>

export default {
  props: ['id', 'pCrt'],

  data() {
    return {
      app: this.$root.$children[0],
      crt: this.pCrt,
      dateList: []
    }
  },

  created() {
    console.log('bycourt created', this.crt)
    if (!this.crt.availbility)
      this.$router.push({path:'/'});
    
    for (let i = 0; i < 8; i++) {      
      let dt = new Date()
      dt.setDate(dt.getDate() + i)
      const dd = dt.getDate().toString().padStart(2, '0')
      const mm = (dt.getMonth()+1).toString().padStart(2, '0')
      const yyyy = dt.getFullYear()
      this.dateList.push('d' + yyyy + mm + dd)
    }
  },

  computed: {
    // crt: function() {
    //   return this.pCrt
    // },

    forceReload: function() {
      return this.app.forceReload
    }
  },

  watch: {
    'forceReload': function (newVal, oldVal) {      
      if (newVal == true) {
        console.log('watch forceReload', newVal, oldVal)
        this.app.changeForceReload(false)
        this.getCourtInfoOnCreated(true)
      }
    }
  },

  methods: {
    async getCourtInfoOnCreated(force) {
      let courtInfos = await this.app.getCourtInfos(force)
      console.log('before', this.crt)
      this.crt = await courtInfos.filter((item) => {
        return item._id == this.crt._id
      })[0]
      console.log('after', this.crt)
    },

    getCourtAvailbilityFields(crt) {
      if (crt && crt.availbility)
        return Object.keys(crt.availbility)
      else
        return []
    },
    getAvailableTSCnt(item, dt, time, field) {
      if (typeof item[dt] != 'undefined' && typeof item[dt][time] != 'undefined') {
        // console.log(item[dt][time])
        return item[dt][time][field]
      }

      return 0
    },
    dateOnClick(date, cr) {      
      let selectedDate = {}
      selectedDate.text =  this.app.dateDisplay(date.dateVal)
      selectedDate.value = date.dateVal
      console.log({selectedDate})
      this.app.changeDate(selectedDate)
      this.$router.push({path:'/'});
      // console.log()
    }
  }


}

</script>
