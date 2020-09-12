<template>
  <v-card>
    <v-card-title class="primary justify-center">
      <span class="headline">
        <v-icon class="pb-1 pr-1">mdi-person_pin</v-icon>
        {{this.$t('app.signup')}}
      </span>
    </v-card-title>
    <v-card-text>
      <v-text-field 
        :outline="!$vuetify.breakpoint.smAndDown"
        :label="this.$t('app.email')" v-model="signupUser.email" required
      ></v-text-field>
      <v-text-field 
        :outline="!$vuetify.breakpoint.smAndDown" 
        :label="this.$t('app.pwd')" type="password"  v-model="signupUser.pwd" required
      ></v-text-field>
      <v-text-field
        :outline="!$vuetify.breakpoint.smAndDown"
        :label="this.$t('app.cnfPwd')" type="password"  v-model="signupUser.cfmpwd" required
      ></v-text-field>
      <v-text-field
        :outline="!$vuetify.breakpoint.smAndDown"
        :label="this.$t('app.fstName')" v-model="signupUser.fstname" required
      ></v-text-field>
      <v-text-field 
        :outline="!$vuetify.breakpoint.smAndDown"
        :label="this.$t('app.surname')" hint="example of persistent helper text" v-model="signupUser.surname"
        persistent-hint
        required
      ></v-text-field>
      <!--
      <v-select
        label="Age"
        required
        :items="['0-17', '18-29', '30-54', '54+']"
      ></v-select>
      <v-select
        label="Interests"
        multiple
        autocomplete
        chips
        :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
      <small>*indicates required field</small>-->
    </v-card-text>
    <v-card-actions class="modal-actions">
      <v-container>
        <v-row dense>
          <v-col cols=8>       
            <v-btn block text class="primary darken-2" @click.native="signup()">
              {{this.$t('app.signup')}}
            </v-btn>
          </v-col>
          <v-col cols=4>            
            <v-btn block text class="accent" @click.native="app.closeDialog">
              {{this.$t('app.cancel')}}
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card-actions>
    <v-card-actions class="modal-actions">
      <v-divider></v-divider> <div style="margin: 0 1em;">or</div> <v-divider></v-divider>
    </v-card-actions>
    <v-card-actions class="modal-actions">
      <v-btn block>
        <v-icon class="fab fa-google icon-with-text"></v-icon>
        {{this.$t('app.googleSignup')}}
      </v-btn> 
    </v-card-actions>
    <v-card-actions class="modal-actions">
      <v-btn block>
        <v-icon class="fab fa-facebook icon-with-text" color="#3b5998"></v-icon>
        {{this.$t('app.facebookSignup')}}
      </v-btn>
    </v-card-actions>         
  </v-card>
</template>


<script>
// import Firebase from 'firebase'
// import db from './firebase-db'
//let user = db.ref("/users")

export default {
  data() {
    return {
      app: this.$root.$children[0],
      signupUser: {
        email: '', pwd: '', fstname: '', surname: ''
      },      
    }
  },    

  computed: {
    user() { 
      return this.$store.state.user
    }
  },

  created() {
    console.log('sign up created', this.$refs)
  },

  watch: {
    user(value) {
      if (value != null && value != 'undefined') {
        this.app.showSnackbar('New user ' + value.fstname + ' ' + value.surname + ' was created.', 3000)
        this.app.closeDialog()
        this.signupUser.email = ''
        this.signupUser.pwd = ''
        this.signupUser.cfmpwd = ''
        this.signupUser.fstname = ''
        this.signupUser.surname= ''
      }
    }
  },    

  methods: {      
    signup() {
      this.$store.dispatch("userSignup", this.signupUser)

      /*Firebase.auth().createUserWithEmailAndPassword(email, password).then(function(user) {
        //var user2 = Firebase.auth().currentUser
        //console.log(user, user2)

        var uid = user.uid
        var updates={}

        updates['/users/' + uid] = {  
          uid: uid, 
          email: email,
          fstname: fstname,
          surname: surname
        }

        db.ref().update(updates)

        vm.app.showSnackbar('New user is created.')

        vm.app.closeDialog()

        vm.user.email = ''
        vm.user.pwd = ''
        vm.user.fstname = ''
        vm.user.surname = ''
      }, function(error) {
        // Handle Errors here.
        var errorCode = error.code
        var errorMessage = error.message
        // ...

        var msg = errorCode + ' ' + errorMessage
        vm.app.showSnackbar(msg, 5000)

      })*/
    }
  }

}
</script>




