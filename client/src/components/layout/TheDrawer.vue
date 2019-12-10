<template>
  <v-navigation-drawer v-model="navAberta" fixed disable-resize-watcher temporary>

    <v-img align="center" height="210px" :src="{{ fundo }}">
      <v-row class="fill-height">
        <v-col align-self="center" class="pa-0" cols="12">
          <v-avatar class="profile" color="grey" size="70" v-if="this.logado">
            <v-img :src="usuarioImagem"></v-img>
          </v-avatar>
        </v-col>
        <v-col class="py-0">
          <v-list-item color="rgba(0, 0, 0, .4)" dark>
            <v-list-item-content>
              <div v-if="loading" class="text-center">
                <v-progress-circular indeterminate color="secondary"></v-progress-circular>
              </div>
              <v-list-item-title v-if="this.logado" class="title">{{usuarioNome}}</v-list-item-title>
              <v-list-item-subtitle v-if="this.logado">{{usuarioEmail}}</v-list-item-subtitle>
              <v-list-item-subtitle v-if="this.logado && !this.usuarioAdmin">Usuário</v-list-item-subtitle>
              <v-list-item-subtitle v-if="this.logado && this.usuarioAdmin">Administrador</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-col>
      </v-row>
    </v-img>

    <v-divider></v-divider>
    <v-list dense nav>

      <v-list-item link>
        <v-list-item-icon>
          <v-icon>mdi-home</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item link>
        <v-list-item-icon>
          <v-icon>mdi-cart</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Loja</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <div v-if="loading" class="text-center">
        <br />
        <br />
        <br />
        <br />
        <v-progress-circular indeterminate color="secondary"></v-progress-circular>
      </div>

      <v-list-item v-if="logado" link>
        <v-list-item-icon>
          <v-icon>mdi-account</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Usuario</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item v-if="usuarioAdmin" link>
        <v-list-item-icon>
          <v-icon>mdi-cogs</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Admin</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

    </v-list>

  </v-navigation-drawer>
</template>

<script>
  export default {
    methods: {
      //Abrir menu de navegação
      abrirNav() {
        this.navAberta = !this.navAberta;
        this.quemSou();
      },
    },
    computed: {
      fundo() {
        if (this.$vuetify.theme.dark)
          return '@/assets/black.jpg';
        else
          return '@/assets/white.jpg';
      }
    }
    data() {
      return {
      //Está aberta?
      aberta: false,
      }
    },
  };
</script>
