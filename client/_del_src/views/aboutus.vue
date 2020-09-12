<template>
  <v-card
    max-width="375"
    class="mx-auto"
  >
    <v-img
      :src="require('../assets/img/main.jpg')"
      height="300px"
      dark
    >
      <v-row class="fill-height">
        <!-- <v-spacer></v-spacer> -->

        <v-card-title class="white--text mt-12 pt-12">
          <div 
            class="display-1"
            :class="$vuetify.breakpoint.smAndDown ? 'pl-2 pt-2':'mt-12 pt-12'"
          >
            {{this.$t('app.company.fullName')}}
          </div>
        </v-card-title>
      </v-row>
    </v-img>

    <v-list two-line>
      <v-list-item @click="openLink('tel:' + $t('app.company.phone'))">
        <v-list-item-icon>
          <v-icon color="indigo">mdi-phone</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>
            {{this.$t('app.company.phone')}}
          </v-list-item-title>
          <v-list-item-subtitle>Office</v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-icon>
          <v-icon>mdi-chat</v-icon>
        </v-list-item-icon>
      </v-list-item>

      <v-list-item @click="openLink('tel:' + $t('app.company.phone2'))">
        <v-list-item-action></v-list-item-action>

        <v-list-item-content>
          <v-list-item-title>
            {{this.$t('app.company.phone2')}}
          </v-list-item-title>
          <v-list-item-subtitle>Office</v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-icon>
          <v-icon>mdi-chat</v-icon>
        </v-list-item-icon>
      </v-list-item>

      <v-list-item @click="openLink('tel:' + $t('app.company.phone3'))">
        <v-list-item-action></v-list-item-action>

        <v-list-item-content>
          <v-list-item-title>
            {{this.$t('app.company.phone3')}}
          </v-list-item-title>
          <v-list-item-subtitle>Office</v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-icon>
          <v-icon>mdi-chat</v-icon>
        </v-list-item-icon>
      </v-list-item>      

      <v-divider inset></v-divider>

      <v-list-item @click="openLink('mailto:xyz@abc.com')">
        <v-list-item-icon>
          <v-icon color="indigo">mdi-email</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>
            {{this.$t('app.company.email')}}
          </v-list-item-title>
          <v-list-item-subtitle>Offical</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider inset></v-divider>

      <v-list-item>
        <v-list-item-icon>
          <v-icon color="indigo">mdi-map-marker</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>
            {{this.$t('app.company.address')}}
          </v-list-item-title>
          <!-- <v-list-item-subtitle>Orlando, FL 79938</v-list-item-subtitle> -->
        </v-list-item-content>
      </v-list-item>

      <v-divider inset></v-divider>

      <v-list-item>
        <v-list-item-icon>
          <v-icon color="indigo">mdi-alarm</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>
            {{this.$t('app.company.work_day')}}
          </v-list-item-title>
          <v-list-item-subtitle>
            {{this.$t('app.company.work_hour')}}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>      

    </v-list>
  </v-card>

	<!-- <div style="height:100%">
		<div class="center-container">
			<div class="about-us-box"> 
				<v-layout wrap >
					<v-flex xs12 class="text-xs-center about-us-header primary">
						<v-avatar class="about-us-icon" :size="50">
							<v-img src="./static/img/logo.jpg" alt="avatar"></v-img>
						</v-avatar>
						<div class="headline app-title">							
							{{this.$t('app.company.fullName')}}
						</div>
					</v-flex>
					<v-flex xs12 class="text-xs-center" style="margin-bottom: 10px;">
						<v-divider></v-divider>
					</v-flex>					
					<v-flex xs12 class="text-xs-center ma-2">
						<div>
							<v-icon class="fas fa-map-marked-alt"></v-icon>
							{{this.$t('app.company.address')}}
						</div>
						<div>
							<v-icon class="info-icon">business</v-icon>
							{{this.$t('app.company.work_hour')}}
							{{this.$t('app.company.work_day')}}
						</div>
						<div>
							<v-icon class="info-icon">phone</v-icon>	
							{{this.$t('app.company.phone')}} 
						</div>
						<div>	
							<v-icon class="info-icon">phone</v-icon>
							{{this.$t('app.company.phone2')}}
						</div>
						<div>	
							<v-icon class="info-icon">phone</v-icon>
							{{this.$t('app.company.phone3')}}
						</div>
						<div>
							<v-icon class="info-icon far fa-envelope"></v-icon>
							<a :href="'mailto:' + this.$t('app.company.email')">								
								{{this.$t('app.company.email')}}
							</a>
						</div>
					</v-flex>
				</v-layout>
			</div>
		</div>
	</div> -->
</template>

<script>

export default {
	data() {
		return {
		}
	},
	methods: {
		openLink(url) {
			window.location = url;
		}
	}
}	
</script>

<style>
/* .about-us-box {
	border: 1px solid rgba(0,0,0,.5);
	border-radius: 10px !important;
	box-shadow: rgba(0,0,0,0.8) 0 0 10px;
  border-collapse: collapse;
	min-width: 25em;
}

.about-us-header {
	border-top-left-radius: 10px !important;
	border-top-right-radius: 10px !important;
}

.about-us-header div.app-title {
	position: relative;	
	top: -10px;
}

.about-us-icon {
	position: relative;	
	top: -15px;
} */

</style>