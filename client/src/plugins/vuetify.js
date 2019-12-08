import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#329DB5',
        secondary: '#b54a32'
      },
      dark: {
        primary: '#5C95A2',
        secondary: '#a2695c'
      }
    }
  }
});
