<template>
  <v-card>
    <v-card-title class="justify-center primary">
      <span class="headline justify-center">
        <v-icon class="pb-1 pr-1">mdi-fingerprint</v-icon>
        {{this.$t('app.login')}}
      </span>
    </v-card-title>
    <v-card-text>
      <v-text-field outline 
        :label="this.$t('app.email')" v-model="loginUser.email">
      </v-text-field>
      <v-text-field outline 
        :label="this.$t('app.pwd')" type="password"  v-model="loginUser.pwd">
      </v-text-field>
    </v-card-text>
    <v-card-actions class="modal-actions">
      <v-container>
        <v-row dense>
          <v-col cols=8>
            <v-btn block text class="primary darken-2" @click.native="login">
              {{this.$t('app.login')}}
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
        {{this.$t('app.googleLogin')}}
      </v-btn> 
    </v-card-actions>
    <v-card-actions class="modal-actions">
      <v-btn block>
        <v-icon class="fab fa-facebook icon-with-text" color="#3b5998"></v-icon>
        {{this.$t('app.facebookLogin')}}
      </v-btn>
    </v-card-actions>      
  </v-card>
</template>

<script>
// import Firebase from 'firebase'
// import db from './firebase-db'

export default {
  data() {
    return {
      loginUser: {
        email: '', 
        pwd: ''
      },
      app: this.$root.$children[0],
    }
  },

  computed: {
    user() { 
      return this.$store.state.user
    }
  },

  watch: {
    user(value) {
      if (value != null && value != 'undefined') {
        this.app.showSnackbar('Welcome back ' + value.fstname + ' ' + value.surname, 3000)
        this.app.closeDialog()
        this.loginUser.email = ''
        this.loginUser.pwd = ''
      } else {
        this.app.showSnackbar('You are logged out.', 2000)
        this.app.closeDialog()
      }
    }
  },

  created() {

    // var vm = this

    // Firebase.auth().onAuthStateChanged(function(user) {
    //   if (user) {
    //     // User is signed in.
    //     console.log('user', Firebase.auth().currentUser)
    //     //vm.user = Firebase.auth().currentUser
    //   } else {
    //     // No user is signed in.
    //     console.log('logout')
    //   }
    // })
  },    

  methods: {
    login() {
      this.$store.dispatch('userLogin', this.loginUser)

      // var vm = this
      // var email = this.loginUser.email
      // var password = this.loginUser.pwd

      // console.log(email, password)

      // Firebase.auth().signInWithEmailAndPassword(email, password).then(function(user) {       
      //   vm.$bindAsObject('curUser', db.ref("/users/" + user.uid), null, function() {                   
      //     vm.app.showSnackbar('Welcome back ' + vm.curUser.fstname + ' ' + vm.curUser.surname, 3000)
      //     vm.app.closeDialog()
      //     //console.log(vm.curUser)
      //     vm.user.email = ''
      //     vm.user.pwd = ''
      //   })

      //   //console.log(vm)
      //   //Redirect to successful page.
      //   //vm.$router.go("/")
      // },function(error) {
      //   // Handle Errors here.
      //   var errorCode = error.code
      //   var errorMessage = error.message
      //   // ...

      //   var msg = errorCode + ' ' + errorMessage
      //   vm.app.showSnackbar(msg, 5000)
      // })

    }     
  }

}
</script>



