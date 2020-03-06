<template>
<v-app>
  <TheHeader
    :carregando="carregando"
    :usuario="usuario"
    @dark-mode="darkMode"
    @abrir-nav="navAberta = !navAberta"
  />
  <TheDrawer
    :carregando="carregando"
    :usuario="usuario"
    v-model="navAberta"
  />
  <v-content>
    <router-view></router-view>
  </v-content>
</v-app>
</template>

<script>
import axios from 'axios';
import TheHeader from '@/components/layout/TheHeader';
import TheDrawer from '@/components/layout/TheDrawer';

export default {
  name: 'App',
  components: {
    TheHeader,
    TheDrawer,
  },
  data() {
    return {
      //Aqui armazenamos o usuario logado
      usuario: {
        dados: null,
        logado: false,
        admin: false
      },
      //E o token atual
      token: '',
      //Uma variavel pra saber se uma sessão está sendo checada
      carregando: true,
      //Saber se a navegação está aberta
      navAberta: false,
    }
  },
  methods: {
    //Buscar nos cookies o token de autenticação
    atualizarToken() {
      this.token = window.$cookies.get('token');
    }
  },
  created() {
    //Verificamos se o dispositivo prefere dark ou light
    this.$vuetify.theme.dark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      )
      .matches;
  },
  mounted() {
    //Buscamos o token inicialmente
    this.atualizarToken();
  },
  updated() {
    //Buscar o token caso haja atualização
    this.atualizarToken();
  },

  computed: {
    //Determinar se o app deve ficar light ou dark
    isDark() {
      //Modo dark
      if (this.$store.state.opcaoDark === 'd') {
        return true;
      }
      //Modo light
      else if (this.$store.state.opcaoDark === 'l') {
        return false;
      }
      //Modo automatico
      else {
        return window.matchMedia(
            '(prefers-color-scheme: dark)'
          )
          .matches;
      }
    }
  },
  watch: {
    //Aplicar o tema
    isDark() {
      this.$vuetify.theme.dark = this.isDark
    },
    //Vamos ficar de olho se o token mudar, e atualizar o usuario caso a sessão seja valida
    async token() {
      window.console.log(`${this.token}`);
      this.carregando = true;
      try {
        const request = await axios.get('/api/usuarios/eu', {
          'headers': {
            'Authorization': this.token
          }
        });
        //Guardar usuario, caso sessão valida
        this.usuario.dados = request.data;
        this.usuario.logado = true;
        this.usuario.admin = this.usuario.dados.admin;
      } catch {
        //Caso a sessão seja invalida
        this.usuario.dados = null;
        this.usuario.logado = false;
        this.usuario.admin = false;
      }
      this.carregando = false;
    },
  },
};
</script>
