<template>
  <div>
    <v-toolbar
      :height="infoToolBarIsHidden ? '0px' : '80px'"
      :class="infoToolBarIsHidden ? 'info-toolbar-hidden' : ''"
    >
      <v-toolbar-title v-text="toolbar.title" class="app-title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn text class="blue-grey--text"> 
          <v-icon class="info-icon">mdi-phone</v-icon>
          {{this.$t('app.company.phone')}}
        </v-btn>
        <v-btn text class="blue-grey--text text-center">
          <v-icon class="info-icon">mdi-business</v-icon>
          {{this.$t('app.company.work_hour')}} <br/>
          {{this.$t('app.company.work_day')}}
        </v-btn>         
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>

<script>

export default {
  props: ['toolbar', 'infoToolBarIsHidden'],
  data() {    
		return {
		}
	},

}

</script>


<style>

.info-toolbar-hidden {
  visibility: hidden;
}

</style>