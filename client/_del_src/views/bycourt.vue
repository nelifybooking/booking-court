<template>
  <div>
    {{crt.venueDisplay}}
    <v-simple-table
      dense      
      v-if="id"
    >
      <template v-slot:default>
        <thead>
          <tr>
            <th 
              class="text-left court-header primary darken-3"
            >Date</th>
            <th 
              v-for='i in 16' 
              :key='i' 
              class="text-center timeslot-header primary"
            >{{i+6}}</th>
          </tr>
        </thead>        
        <tbody>
          <tr v-for="(rc, i) in Object.keys(crt.availbility)" :key="i">
            <td 
              class="text-left court-name"              
            >
              {{crt.availbility[rc].dateVal}}
            </td>
            <td v-for='i in 16' :key='i' class="text-center timeslot">
              {{ getAvailableCourtCount(crt.availbility, rc, 't' + (i+6)) }}
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>

export default {
  props: ['id', 'crt'],

  // data() {
  //   return {
  //     app: this.$root.$children[0]
  //   }
  // },

  created() {
    console.log('bycourt created', this.crt)
    if (!this.crt.availbility)
      this.$router.push({path:'/'});
      
  },

  methods: {
    getCourtAvailbilityFields(crt) {
      if (crt && crt.availbility)
        return Object.keys(crt.availbility)
      else
        return []
    },
    getAvailableCourtCount(item, dt, time) {
      if (typeof item[dt] != 'undefined' && typeof item[dt][time] != 'undefined')
        return item[dt][time].cnt
      else
        return 0
    },
  }


}

</script>