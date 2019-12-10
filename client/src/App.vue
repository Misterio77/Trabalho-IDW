<template>
  <v-app>
    <AppHeader @darkMode="darkMode" />
    <v-content>
    <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
  import axios from 'axios';
  const api = axios.create({
    baseURL: ''
  });
  import AppHeader from '@/components/AppHeader';

  export default {
    name: 'App',
    components: {
      AppHeader,
      AppAuth,
    },
    methods: {
      //Modo noturno manual
      darkMode() {
        this.$vuetify.theme.dark = !(this.$vuetify.theme.dark);
      },
    },
    mounted: {
    //Verificar se o dispositivo está em dark mode
      this.$vuetify.theme.dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
  };
</script>
