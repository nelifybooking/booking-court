<template>
  <v-container class="center-container fluid">
    <v-card style="width:95%">
      <v-layout row wrap justify-center>
        <v-flex class="text-xs-center" xs12 md7>
          <v-card-title class="justify-center">
            <span class="headline">
              <v-icon class="pb-1 pr-1">fas fa-unlock</v-icon>
              {{this.$t('forgotPwd.header')}}
            </span>
          </v-card-title>
          <v-card-text>
            <v-text-field 
              :outline="!$vuetify.breakpoint.smAndDown" 
              :label="this.$t('app.email')" type="password"  v-model="email" required
            ></v-text-field>
            <v-text-field
              :outline="!$vuetify.breakpoint.smAndDown"
              :label="this.$t('app.cnfEmail')" v-model="cfmemail" required
            ></v-text-field>
          </v-card-text>
          <v-card-actions class="modal-actions">       
            <v-btn block class="primary darken-2" flat @click.native="changePwd()">
              {{this.$t('app.sendResetPwdLink')}}
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
              <p class="title">Password must contain:</p>
              <ul>
                <li>At least 1 upper case letter (A-Z)</li>
                <li>At least 1 number (0-9)</li>
                <li>At least 8 characters</li>
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
      email: '',
      cnfemail: ''
    }
  }
}

</script>

<style>

.pwd-tips-md-up {
  padding-top: 80px;
}


</style>