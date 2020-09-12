<template>
  <div class="pa-5">
    <v-card
      max-width="375"
      class="mx-auto"
    >
      <v-img
        :src="require('../assets/img/main.jpg')"
        height="200px"
        dark
      >
        <v-row class="fill-height">
          <!-- <v-spacer></v-spacer> -->
          <v-card-title class="white--text">
            <div class="display-1">
              <!--{{this.$t('app.company.fullName')}}-->
            </div>
          </v-card-title>
        </v-row>
      </v-img>

      <v-card-text>
        <div></div>
        <p class="subtitle-1">{{$t('aboutUs.aboutAppQue')}}</p>
        <div class="text--primary">
          {{$t('aboutUs.aboutAppAns')}}
        </div>
        <br/>
        <p class="subtitle-1">{{$t('aboutUs.whoQue')}}</p>
        <div class="text--primary">
          {{$t('aboutUs.whoAns')}}
        </div>
        <br/>
        <p class="subtitle-1">{{$t('aboutUs.howSupportQue')}}</p>
        <div class="text--primary">
          {{$t('aboutUs.howSupportAns')}}
        </div>
      </v-card-text>  

      <v-divider></v-divider>    

      <v-list two-line>
        <!--<v-list-item @click="openLink('tel:' + $t('app.company.phone'))">
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

        <v-divider inset></v-divider>-->

        <v-list-item>
          <v-list-item-icon>
            <v-icon color="indigo">mdi-account</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>
              {{this.$t('app.company.person')}}
            </v-list-item-title>
            <v-list-item-subtitle> {{$t('aboutUs.developer')}}</v-list-item-subtitle>
          </v-list-item-content>
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
            <v-list-item-subtitle>{{$t('aboutUs.sendUsEmail')}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <!--<v-divider inset></v-divider>-->

        <!--<v-list-item>
          <v-list-item-icon>
            <v-icon color="indigo">mdi-map-marker</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              {{this.$t('app.company.address')}}
            </v-list-item-title>
            <v-list-item-subtitle>Orlando, FL 79938</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider inset></v-divider>-->

        <!--<v-list-item>
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
        </v-list-item>-->

      </v-list>
    </v-card>
  </div>
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