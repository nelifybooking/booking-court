<template>
  <v-container fluid>
    <div 
      class="display-2 text-xs-center"
      style="margin: 20px;"
    >
      {{header}}
    </div>
    <v-timeline
      :dense="this.$vuetify.breakpoint.smAndDown ? true : false"
      align-top
    >
      <v-timeline-item
        v-for="n in 4"
        :key="n"
        color="red lighten-2"
      >
        <!-- <template v-slot:icon>
          <v-avatar>
            <img src="http://i.pravatar.cc/64">
          </v-avatar>
        </template> 
        <template v-slot:opposite>
          <span>Tus eu perfecto {{n}}</span>
        </template> -->
        <v-card class="elevation-2">
          <v-card-title class="headline">Lorem ipsum</v-card-title>
          <v-card-text>
            Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an salutandi sententiae.
          </v-card-text>
        </v-card>
      </v-timeline-item>
    </v-timeline>
  </v-container>
</template>

<script>

  export default {
    data() {
      return {
        header: this.$t('flow.header')
      }
    }
  }

</script>

<style></style>