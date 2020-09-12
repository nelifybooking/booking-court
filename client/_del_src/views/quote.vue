<template>
  <div>
    Quote Page {{this.$t('app.company.work_day')}}
    <!-- <v-btn @click="fbStatus()">FB Status</v-btn> -->

    <!-- <fb:login-button 
      scope="public_profile,email"
      onlogin="checkLoginState();">
    </fb:login-button>     -->
  </div>
</template>

<script>
export default {
	data() {
		return {
		}
  },
  created() {
    console.log('quote page created')
    // window.fbAsyncInit = function() {
    //   FB.init({
    //     appId      : '680279789426092',
    //     cookie     : true,
    //     xfbml      : true,
    //     version    : 'v6.0'
    //   });
        
    //   FB.AppEvents.logPageView();   
        
    // };  
    // (function(d, s, id){
    //   var js, fjs = d.getElementsByTagName(s)[0];
    //   if (d.getElementById(id)) {return;}
    //   js = d.createElement(s); js.id = id;
    //   js.src = "https://connect.facebook.net/en_US/sdk.js";
    //   fjs.parentNode.insertBefore(js, fjs);
    // }(document, 'script', 'facebook-jssdk'));
  },
  methods: {
    // fbStatus() {
    //     FB.getLoginStatus(function(response) {
    //       statusChangeCallback(response);
    //     });  
    // }
  }
}
</script>