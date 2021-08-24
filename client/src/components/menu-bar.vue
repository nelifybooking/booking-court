<template>
  <div>
    <v-app-bar
      app
      color="primary"
      dense
      dark
    >
      <v-btn 
        icon
        small
        to='/'
      >
        <v-icon>mdi-basketball</v-icon>
      </v-btn>
      <!--<span >{{currentRouteName}}</span>-->
      <v-menu 
        offset-y
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            dark
            text 
            v-bind="attrs"
            v-on="on"
            :class="{'d-none': currentRouteName != 'home'}"
            class="pa-1 pa-sm-5"
            :small="$vuetify.breakpoint.smAndDown"
          >
            {{ selectedDate.text }}
          </v-btn>
        </template>
        <v-list>          
          <v-list-item>
            <div style="width: 100%" class="text-center">
              {{$t('menuBar.filterDate.selectDate')}}
            </div>
          </v-list-item>
          <v-divider></v-divider>
          <!--<v-list-item>
          <v-chip-group
            v-model="selectedDate.value"
            column
            active-class="primary--text"
          >
            <v-chip 
              v-for="(item, index) in availableDate" 
              :key="index"
              :value="item.value"              
              @click="changeDate(item)"
            >
              {{item.text}}
            </v-chip>
          </v-chip-group>
          </v-list-item>-->  
          <v-list-item
            v-for="(item, index) in availableDate"
            :key="index"
            @click="changeDate(item)"
          >
            <v-list-item-title class="text-center">
              {{ item.text }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-menu 
        v-model="districtMenu"
        offset-y
        :close-on-content-click="false"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            dark
            text
            v-bind="attrs"
            v-on="on"
            :class="{'d-none': currentRouteName != 'home'}"
            class="pa-1 pa-sm-5"
            :small="$vuetify.breakpoint.smAndDown"
          >
            {{selectedAreaText}}
          </v-btn>
        </template>
        <v-list>
          <div 
            v-for="(area, index) in availableArea"
            :key="index"
          >
            <v-divider></v-divider>
            <v-list-item>
              <span class="area">{{ area['area' + app.langField] }}</span>
              <v-spacer></v-spacer>
              <v-switch
                color="green lighten-2"
                large
                v-model="area.selected" 
                @change="toggleArea(area)"
              ></v-switch>
            </v-list-item>

            <v-list-item class="area">
            <v-chip-group
              v-model="area.selectedDistricts"
              column
              multiple
              active-class="green--text lighten-2"
              @change="toggleDistrict(area)"
            >
              <v-chip 
                v-for="(district, dIndex) in area.districts" 
                :key="dIndex"
                small
                :value="district.code"    
              >
                {{ app.langField == 'Chi' ? district.chi : district.eng }}
              </v-chip>
            </v-chip-group>
            </v-list-item>
          </div>
          <v-list-item>
            <v-btn 
              block
              class="success"
              @click="searchBtnClick()"
            >
              {{$t('menuBar.filterArea.filterBtn')}}
            </v-btn>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-spacer></v-spacer>
      <v-btn
        icon
        small
        @click="langChange()"
      >
        {{currLang}}
      </v-btn>
      <v-btn 
        icon
        small
        to='/aboutus'
      >
        <v-icon small>mdi-information-variant</v-icon>
      </v-btn>
      <v-btn 
        icon
        small
        @click="changeForceReload(true)"
      >
        <v-icon small>fas fa-sync-alt</v-icon>
      </v-btn>      
    </v-app-bar> 

  </div>
</template>

<script>
import Vue from 'vue'
// import ProfileMenu from '../components/profile-menu'

// Vue.component('n-profile-menu', ProfileMenu)

export default {
  props: [
    // 'filteredToolBarMenusLeft', 
    // 'filteredToolBarMenusRight', 
    // 'infoToolBarIsHidden', 
    // 'title',
    // 'toggleDrawer',
    'pSelectedDate',
    'pAvailableArea',
    'pForceReload'
  ],

  data() {    
		return {
      app: this.$root.$children[0],
      availableDate: [],
      // selectedDate: {},
      availableArea: [],
      districtMenu: false,
      searchCliked: false,
      currentRouteName: this.$route.name,      
		}
  },

  async created() {
    console.log('menu bar created', this.app.langField)
    this.getAvailableDate(8)
    this.getAvailableArea()
  },

  computed: {
    // a computed getter
    selectedAreaText: function () {
      return this.getSelectedAreaText()
    },
    selectedDate: function() {
      return this.pSelectedDate
    },
    forceReload: function() {
      return this.pForceReload
    },
    currLang: function() {
      return this.app.langField == "Chi" ? '繁' : 'En'
    }
  }, 

  watch: {
    districtMenu(value) {
      if (value == false) {
        if (!this.searchCliked)
          this.loadAvailableArea()        
        this.searchCliked = false
      }
    },
    $route (to, from){
      console.log('$route', this.$route)
      this.currentRouteName = this.$route.name
    }
  },

  methods: {
    changeForceReload(value) {
      this.$emit('forceReloadChanged', value)
    },

    langChange() {
      this.$i18n.locale = this.app.langField == 'Chi' ? 'en' : 'zhHant'
      localStorage.setItem('lang', this.$i18n.locale)
      // console.log(this._i18n.locale)
    },

    getAvailableDate(noOfDay) {
      let curDate = new Date() 

      console.log({curDate})
    
      for (var i=0; i<noOfDay; i++) {        
        let item = {}
        item.text = this.app.pad(curDate.getDate(),2) + '/' + this.app.pad((curDate.getMonth()+1),2) + '/' + curDate.getFullYear()
        item.value = curDate.getFullYear().toString() + this.app.pad((curDate.getMonth()+1),2) + this.app.pad(curDate.getDate(),2)
        this.availableDate.push(item)
        curDate.setDate(curDate.getDate() + 1)
      }

      // use latest date as default
      this.selectedDate.text = this.availableDate[this.availableDate.length - 1].text
      this.selectedDate.value = this.availableDate[this.availableDate.length - 1].value

      this.$emit('filterDateChanged', this.selectedDate)

      console.log('items', this.availableDate)
    },

    async loadAvailableArea() {
      let lsAvailableArea = JSON.parse(localStorage.getItem('availableArea'))

      this.selectedDistricts = []

      await this.availableArea.forEach(async (area) => {
        Vue.set(area, 'selected', false)
        Vue.set(area, 'selectedDistricts', [])
        if (lsAvailableArea == null) {
          area.selected = true
          this.toggleArea(area)
          console.log('load default')
        } else {        
          let lsArea = await lsAvailableArea.filter((lsArea) => { return lsArea.code == area.code })        
          area.selectedDistricts = lsArea[0].selectedDistricts
          this.toggleDistrict(area)
          console.log('load localStorage', lsAvailableArea)
        }
      })
    },

    async getAvailableArea() {
      // let response = await this.app.getDataFromDB(`${process.env.VUE_APP_REST_API_URL}/areas?sub=t`)
      let response = await this.app.getDataFromDB(`https://nelify-restapi.herokuapp.com/areas?sub=t`)
      this.availableArea = response.data

      await this.loadAvailableArea()
      this.$emit('filterAreaChanged', this.availableArea)
    
      console.log('areas', this.availableArea)
    },

    changeDate(item) {
      this.$emit('filterDateChanged', item)
    }, 


    toggleArea(area) {
      console.log('toggleArea', this.availableArea)
      if (typeof area.selectedDistricts == 'undefined')
        area.selectedDistricts = []

      if (area.selected && area.selected == true) {
        area.districts.forEach((district) => {        
          if (!area.selectedDistricts.includes(district.code))
            area.selectedDistricts.push(district.code)
        })
      } else {
        area.selectedDistricts = []
      }
      // console.log('toggleArea', this.availableArea, area.selected)
    },
    toggleDistrict(area) {
      console.log('toggleDistrict', this.availableArea)
      let cnt = area.districts.length
      let selected = area.selectedDistricts.length
      area.selected = selected >= cnt
    },

    async searchBtnClick() {
      console.log('searchBtnClick', this.availableArea)
      this.searchCliked = true
      this.$emit('filterAreaChanged', this.availableArea)
      localStorage.setItem('availableArea', JSON.stringify(this.availableArea))
      this.districtMenu = false
    },
    
    getSelectedAreaText() {
      let text = ''
      let selectedAllCnt = 0
      let areaCnt = this.availableArea.length

      this.availableArea.forEach((area) => {
        let cnt = area.districts.length
        let selected = area.selectedDistricts && area.selectedDistricts.length ? area.selectedDistricts.length : 0
        let areaName = this.app.langField == 'Chi' ? area.areaChi : area.code

        if (selected > 0) {
          if (text != '')
            text += ', '

          if (selected >= cnt) {
            selectedAllCnt++
            text += areaName + '(' + this.$t('menuBar.filterArea.all') + ')'
          } else {
            text += areaName + '(' + selected + ')'
          }
        }
      })

      if (selectedAllCnt >= areaCnt)
        text = this.$t('menuBar.filterArea.all')
      
      if (text == '')
        text = this.$t('menuBar.filterArea.selectDistrict')

      console.log(text, selectedAllCnt, areaCnt)
      
      return text
    },    

  }

}
</script>

<style>
/*.selected-chip2 {
  background-color: green;
  color: white;
}*/
</style>
