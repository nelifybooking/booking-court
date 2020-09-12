<template>
  <v-footer 
    height="auto"
    class="footer accent white--text"
  >
    <v-layout mx-2 row wrap justify-center>
      <v-flex xs12 py-1 text-xs-center text-sm-right white--text>
        <v-icon class="white--text fas fa-map-marked-alt"></v-icon>
        {{this.$t('app.company.address')}}
      </v-flex>
      <v-flex xs12 py-1 text-xs-center text-sm-right>
        <v-icon class="white--text info-icon">mdi-phone</v-icon>
        {{this.$t('app.company.phone')}}
      </v-flex>
      <v-flex xs12 py-1 text-xs-center text-sm-right>
        <v-icon class="white--text info-icon">mdi-business</v-icon>
        {{this.$t('app.company.work_hour')}}
        {{this.$t('app.company.work_day')}}
      </v-flex>
      <v-flex xs12 text-xs-center text-sm-left>
        <small>© AutoService - Design by @Nelson Cheung. All Rights Reserved.</small>
      </v-flex>
      <!-- <v-flex xs12 sm6 py-3 text-xs-center white--text>
        &copy;2018 — <strong>Vuetify</strong>
      </v-flex> -->
    </v-layout>
  </v-footer>
</template>

<script>

export default {
	data() {    
		return {
		}
	},
	methods: {
	}
}	
</script>

<style>


</style>