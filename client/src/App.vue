<template>
  <v-app>
    <NavegacaoBarra/>
    <v-content>
    <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import NavegacaoBarra from '@/components/NavegacaoBarra.vue';

export default {
  name: 'App',
  components: {
    NavegacaoBarra
  }
};
</script>
