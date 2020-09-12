<template>
  <v-menu bottom left v-if="this.user">
    <template v-slot:activator="{ on }">
      <v-btn
        dark
        icon
        v-on="on"
      >
        <v-avatar :size="36">
					<v-img :src="require('../assets/img/logo.jpg')" alt="avatar"></v-img>
				</v-avatar>
      </v-btn>
    </template>

    <v-list>
      <v-list-item
        to="/"
      >
        <v-list-item-avatar>
          <v-avatar :size="30">
            <v-img :src="require('../assets/img/logo.jpg')" alt="avatar"></v-img>
          </v-avatar>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>
            {{this.user.fstname}} {{this.user.surname}} 
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item
        to="/changepwd"
      >
        <v-list-item-avatar>
          <v-icon class="fas fa-key"></v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>Change password</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>            
      <v-list-item
        @click="logout"
      >
        <v-list-item-avatar>
          <v-icon>mdi-exit_to_app</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item-content>        
      </v-list-item>
    </v-list>
  </v-menu>
  
</template>

<script>

export default {
  props: [
    // 'logout'
  ],
  data() {
    return {
      app: this.$root.$children[0],
    }
  },
  computed: {
    user() {
      // return {
      //   fstname: 'hello', 
      //   surname: 'world'
      // }
      return this.$store.state.user
    }
  },
  created() {
    console.log(this.user)
  },
  methods: {
    logout() {
      this.$store.dispatch('userLogout')
    }
  }
}


</script>