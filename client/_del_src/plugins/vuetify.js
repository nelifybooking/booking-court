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

const i18n = new VueI18n({
    locale: 'zhHant', // set locale
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
        themes: {
          light: {
            primary: '#A1C6AC',
            secondary: '#5DB7BF',
            accent: '#696579',
            error: '#b71c1c',
            info: '#2196F3',
            success: '#4CAF50',
            warning: '#FFC107',
          },
        },
      }
});
