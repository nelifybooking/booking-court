<template>
  <div>
    <v-app-bar
      app
      color="primary"
      dense
      dark
    >
      <v-menu 
        offset-y
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            dark
            text 
            v-bind="attrs"
            v-on="on"
          >
            {{ selectedDate.text }}
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in availableDate"
            :key="index"
            @click="changeDate(item)"
          >
            <v-list-item-title>{{ item.text }}</v-list-item-title>
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
              <span class="area">{{ area.area }}</span>
              <v-spacer></v-spacer>
              <v-switch
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
              active-class="primary--text"
              @change="toggleDistrict(area)"
            >
              <v-chip 
                v-for="(district, dIndex) in area.districts" 
                :key="dIndex"
                small
                :value="district.code"    
              >
                {{ district.eng }}
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
              Search
            </v-btn>
          </v-list-item>        
        </v-list>
      </v-menu>
    </v-app-bar> 

  </div>
</template>

<script>
import Vue from 'vue'
// import ProfileMenu from '../components/profile-menu'

// Vue.component('n-profile-menu', ProfileMenu)

export default {
  props: [
    'filteredToolBarMenusLeft', 
    'filteredToolBarMenusRight', 
    'infoToolBarIsHidden', 
    'title',
    'toggleDrawer'
  ],

  data() {    
		return {
      app: this.$root.$children[0],
      availableDate: [],
      selectedDate: {},
      availableArea: [],
      districtMenu: false,
      searchCliked: false,
		}
  },

  async created() {
    console.log('menu bar created')
    this.getAvailableDate(11)
    this.getAvailableArea()
  },

  computed: {
    // a computed getter
    selectedAreaText: function () {
      return this.getSelectedAreaText()
    }
  }, 

  watch: {
    districtMenu(value) {
      if (value == false) {
        if (!this.searchCliked)
          this.loadAvailableArea()        
        this.searchCliked = false
      }
    }
  },

  methods: {
    getAvailableDate(noOfDay) {
      let curDate = new Date('07/10/2020') 

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
      let response = await this.app.getDataFromDB('http://localhost:3000/areas?sub=t')
      this.availableArea = response.data

      await this.loadAvailableArea()

      this.$emit('filterAreaChanged', this.availableArea)
    
      console.log('areas', this.availableArea)
    },

    changeDate(item) {
      // this.selectedDate.text = item.text
      // this.selectedDate.value = item.value
      this.selectedDate = item
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

        if (selected > 0) {
          if (text != '')
            text += ', '

          if (selected >= cnt) {
            selectedAllCnt++
            text += area.code + '(all)'
          } else {
            text += area.code + '(' + selected + ')'
          }
        }
      })

      if (selectedAllCnt >= areaCnt)
        text = 'All'
      
      if (text == '')
        text = 'Select District'

      console.log(text, selectedAllCnt, areaCnt)
      
      return text
    },    

  }

}

</script>