<template>
  <div>
		<v-parallax
				style="height:46vh;"
				:src="this.imgUrl"
		>
			<div 
				class="main-parallex-header mb-5 pb-2"
				:class="$vuetify.breakpoint.smAndDown ? 'display-1':'display-2'"
			>
				{{header}}
			</div>			
			<br/>
			<div class="centered">
				<v-btn class="ma-2" color="secondary darken-3" large>
					<v-icon class="fas fa-comments-dollar icon-with-text"></v-icon>
					{{leaveMsg}}
				</v-btn>
				<v-btn class="ma-2" color="secondary" large :href="whatsappUrl">
					<v-icon class="fab fa-whatsapp icon-with-text"></v-icon>
					WhatsApp {{quote}}
				</v-btn>
			</div>
		</v-parallax>

		<v-layout row wrap pt-2>
			<v-flex class="text-xs-center" xs12 md4 pl-3>
        <v-hover>
          <v-card
            slot-scope="{ hover }"
            :class="`elevation-${hover ? 12 : 2}`"
            height="auto"
            style="padding: 0px 3vw; min-height: 35vh; top: -50px;"
          >
            <v-card-title primary-title class="justify-center">
              <v-img
                :src="services[0].img"
                max-width="8em"
              ></v-img>
            </v-card-title>
            <v-card-text class="text-center"> 
              <div class="headline">
                {{services[0].header}}
              </div>
              We provide top-notch service for 
              import and domestic car repairs. 
              Servicing Brakes, Tune Ups, Engine Repairs
            </v-card-text>
          </v-card>
        </v-hover>
			</v-flex>
			<v-flex class="text-xs-center" xs12 md4 px-3>
        <v-hover>
          <v-card
            slot-scope="{ hover }"
            :class="`elevation-${hover ? 12 : 2}`"
            height="auto"
            style="padding: 0px 3vw; min-height: 35vh; top: -50px;"
          >
            <v-card-title primary-title class="justify-center">
              <v-img
                :src="services[1].img"
                max-width="8em"
              ></v-img>
            </v-card-title>
            <v-card-text class="text-center"> 
              <div class="headline">
                {{services[1].header}}
              </div>
              We provide top-notch service for 
              import and domestic car repairs. 
              Servicing Brakes, Tune Ups, Engine Repairs
            </v-card-text>
          </v-card>
        </v-hover>
			</v-flex>
			<v-flex class="text-xs-center" xs12 md4 pr-3>
        <v-hover>
          <v-card
            slot-scope="{ hover }"
            :class="`elevation-${hover ? 12 : 2}`"          
            height="auto"
            style="padding: 0px 3vw; min-height: 35vh; top: -50px;"
          >
            <v-card-title	card-title primary-title class="justify-center">
              <v-img
                :src="services[2].img"
                max-width="8em"
              ></v-img>
            </v-card-title>
            <v-card-text class="text-center"> 
              <h3 class="headline">
                {{services[2].header}}
              </h3>
              We provide top-notch service for 
              import and domestic car repairs. 
              Servicing Brakes, Tune Ups, Engine Repairs
            </v-card-text>
          </v-card>
        </v-hover>
			</v-flex>

      <v-flex xs12>
        <v-container>
          <v-layout row wrap>
            <v-flex xs12 pb-3 class="text-center">
              <div class="display-2 pb-5">
                {{services[0].header}}
              </div>
              <v-divider></v-divider>
            </v-flex>
            <v-flex xs12 md3 class="text-center">
              <v-img
                :src="services[1].img"
                max-width="10em"
                class="centered"
              ></v-img>
            </v-flex>
            <v-flex xs12 md9>
              <v-sheet
              class="d-flex"
              color="grey lighten-3"
              >
                <!-- <sheet-footer> -->
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                  Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                  when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                  It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. 
                  It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
                  and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                <!-- </sheet-footer> -->
              </v-sheet>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
		</v-layout>    
  </div>
</template>

<script>

export default {
	data() {
		return {
      app: this.$root.$children[0],
      imgUrl: "./static/img/service.jpg",
      header: this.$t("service.header"),
      services: [
        {
          img: "./static/img/scrap.svg",
          header: this.$t("service.service1")
        },
        {
          img: "./static/img/2ndHandCar.svg",
          header: this.$t("service.service2")
        },
        {
          img: "./static/img/checkCar.svg",
          header: this.$t("service.service3")
        },
      ],
      leaveMsg: this.$t("app.leaveMsg"),
      quote: this.$t("app.quote"),
      whatsappUrl: 'https://api.whatsapp.com/send?phone=' + this.$t('whatsapp.phone') 
										+ '&text=' + this.$t('whatsapp.greeting')
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