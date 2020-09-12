<template>
  <v-container class="center-container fluid">
    <v-card style="width:95%">
      <v-layout row wrap justify-center>
        <v-flex class="text-xs-center" xs12 md7>
          <v-card-title class="justify-center">
            <span class="headline">
              <v-icon class="pb-1 pr-1">fas fa-key</v-icon>
              {{this.$t('changePwd.header')}}
            </span>
          </v-card-title>
          <v-card-text>
            <v-text-field 
              :outline="!$vuetify.breakpoint.smAndDown" 
              :label="this.$t('app.oldPwd')" type="password"  v-model="opwd" required
            ></v-text-field>
            <v-text-field 
              :outline="!$vuetify.breakpoint.smAndDown" 
              :label="this.$t('app.newPwd')" type="password"  v-model="pwd" required
            ></v-text-field>
            <v-text-field
              :outline="!$vuetify.breakpoint.smAndDown"
              :label="this.$t('app.cnfPwd')" type="password"  v-model="cfmpwd" required
            ></v-text-field>
          </v-card-text>
          <v-card-actions class="modal-actions">       
            <v-btn block class="primary darken-2" flat @click.native="changePwd()">
              {{this.$t('app.change')}}
            </v-btn>
            <v-btn class="accent" flat @click.native="app.closeDialog">
              {{this.$t('app.cancel')}}
            </v-btn>
          </v-card-actions>
        </v-flex>
        <v-divider
            class="mx-2"
            :vertical="!$vuetify.breakpoint.smAndDown"
          ></v-divider>
        <v-flex xs12 md4>
          <v-card-text class="center-container">
            <span>
              <p class="title">{{this.$t('changePwd.tipsHeader')}}:</p>
              <ul>
                <li>{{this.$t('changePwd.tips1')}}</li>
                <li>{{this.$t('changePwd.tips2')}}</li>
                <li>{{this.$t('changePwd.tips3')}}</li>
              </ul>
            </span>
          </v-card-text>
        </v-flex>
      </v-layout>    
    </v-card>
  </v-container>
</template>

<script>

export default {
  data() {
    return {
      app: this.$root.$children[0],
      opwd: '',
      pwd: '',
      cnfpwd: '',
    }
  }
}

</script>

<style>

.pwd-tips-md-up {
  padding-top: 80px;
}


</style>