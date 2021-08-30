import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import VueI18n from 'vue-i18n'
import en from '../lang/en'
import zhHant from '../lang/zh-Hant'
import 'vuetify/dist/vuetify.min.css'
import '@fortawesome/fontawesome-free/css/all.css'

Vue.use(Vuetify);
Vue.use(VueI18n)

const messages = {
    en, zhHant
}

let lang = localStorage.getItem('lang')

if (!lang)
  lang = 'zhHant'

// console.log({lang})

const i18n = new VueI18n({
    locale: lang, // set locale
    fallbackLocale: 'en',
    messages, // set locale messages
})

export {
    i18n
}

export default new Vuetify({
  lang: {
    t: (key, ...params) => i18n.t(key, params),
  },
  iconfont: 'fa',
  buttons: {
    capitalize: false,
  },
  theme: {
    options: {
      customProperties: true,
    },      
    themes: {
      light: {
        // primary: '#FB8C00',
        primary: '#963E51',
        secondary: '#219179',
        accent: '#696579',
        error: '#b71c1c',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107',
      },
    },
  }
});
