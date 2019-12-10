<template>
  <v-app-bar app fixed shrink-on-scroll prominent color=secondary dark src="../../../assets/bg1.jpg" fade-img-on-scroll>
    <template v-slot:img="{ props }">
      <v-img v-bind="props" gradient="to top right, rgba(181,74,50,.7), rgba(25,32,72,.7)"></v-img>
    </template>
    <v-app-bar-nav-icon @click="abrirNav"></v-app-bar-nav-icon>

    <v-avatar :tile="true">
      <img :src="require('../../../assets/logo.svg')" alt="Casa dos Dogs">
    </v-avatar>
    <v-spacer></v-spacer>
    <v-toolbar-title>Casa dos Dogs</v-toolbar-title>
    <v-spacer></v-spacer>

    <v-tooltip bottom v-if="this.logado">
      <template v-slot:activator="{ on }">
        <v-btn :loading="loading" :disabled="loading" icon v-on="on" @click="logoutAberto = true">
          <v-icon>mdi-logout</v-icon>
        </v-btn>
      </template>
      <span>Logout</span>
    </v-tooltip>

    <v-tooltip bottom v-else>
      <template v-slot:activator="{ on }">
        <v-btn :loading="loading" :disabled="loading" icon v-on="on" @click="loginAberto = true">
          <v-icon>mdi-login</v-icon>
        </v-btn>
      </template>
      <span>Login</span>
    </v-tooltip>

    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on" @click="this.$emit('darkMode')">
          <v-icon>mdi-brightness-6</v-icon>
        </v-btn>
      </template>
      <span>Modo noturno</span>
    </v-tooltip>
  </v-app-bar>
</template>

<script>
//  import AppAuth from '@/components/AppAuth';
//  import AppDarkmode from '@/components/AppForm/AppDarkmode';
//  import AppDrawer from '@/components/AppDrawer';
//  import FormRegister from '@/components/AppForm/FormRegister';
//  import FormRegister from '@/components/AppForm/FormLogin';
//  import FormRegister from '@/components/AppForm/FormLogout';
  
  export default {
    methods: {}
  };
</script>
