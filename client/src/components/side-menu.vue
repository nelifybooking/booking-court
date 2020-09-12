<template>
  <v-navigation-drawer
    temporary
    v-model="isVisible"
    enable-resize-watcher
    fixed
    app
    right
  >
    <v-list class="pb-0">        
      <v-list-item tag="ul">
        <!-- <p v-if="user">Welcome back {{user.surname + ' ' + user.fstname}}</p>
        <h1 v-else class="app-title">{{this.$t('app.title')}}</h1> -->
        <v-spacer></v-spacer>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>
    <v-list 
      dense 
      class="pt-0 link" 
      v-for="(menu, index) in filteredMenus" 
      :key="index" 
    >
      <v-divider v-if="menu.startDivider"></v-divider>
      <v-list-item
        :to="menu.to" @click.native.prevent="handleMenuClick(menu.click, menu)"
        :close-on-click="true"
      >
        <v-list-item-icon v-if="menu.icon">
          <v-icon>{{ menu.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ menu.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider v-if="menu.endDivider"></v-divider>
    </v-list>
  </v-navigation-drawer>
</template>


<script>

export default {
  props: [
    'filteredMenus', 
    'drawer'
  ],
  data() {    
		return {
      isVisible: this.drawer
		}
  },
  methods: {
    handleMenuClick(func, menu) {
      this.$emit('clicked', func, menu)
    }
  },
  watch: { 
    drawer: function() {
      this.isVisible = this.drawer
    },
    isVisible: function() {
      this.$emit('toggleDrawer', this.isVisible)
    }
    //// when props is changes
    // $props: {
    //   handler() {
    //     // this.parseData();
    //     // do something
    //   },
    //   deep: true,
    //   immediate: true,
    // }
  }

}

</script>