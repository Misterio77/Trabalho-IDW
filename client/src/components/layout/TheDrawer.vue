<template>
  <v-navigation-drawer :value="aberta" @input="$emit('toggle-nav', $event)" fixed disable-resize-watcher temporary>

    <v-img align="center" height="210px" :src="require(`@/assets/${fundo}`)">
      <v-row class="fill-height">
        <v-col align-self="center" class="pa-0" cols="12">
          <v-avatar class="profile" color="grey" size="70" v-if="usuario.logado">
            <v-img :src="usuario.imagem"></v-img>
          </v-avatar>
        </v-col>
        <v-col class="py-0">
          <v-list-item color="rgba(0, 0, 0, .4)" dark>
            <v-list-item-content>
              <div v-if="carregando" class="text-center">
                <v-progress-circular indeterminate color="secondary"></v-progress-circular>
              </div>
              <v-list-item-title v-if="usuario.logado" class="title">{{usuario.dados.nome}}</v-list-item-title>
              <v-list-item-subtitle v-if="usuario.logado">{{usuario.dados.email}}</v-list-item-subtitle>
              <v-list-item-subtitle v-if="usuario.logado && !usuario.admin">Usuário</v-list-item-subtitle>
              <v-list-item-subtitle v-if="usuario.logado && usuario.admin">Administrador</v-list-item-subtitle>
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

      <div v-if="carregando" class="text-center">
        <br />
        <br />
        <br />
        <br />
        <v-progress-circular indeterminate color="secondary"></v-progress-circular>
      </div>

      <v-list-item v-if="usuario.logado" link>
        <v-list-item-icon>
          <v-icon>mdi-account</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Usuario</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item v-if="usuario.admin" link>
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
    methods: {},
    props: [
      'carregando',
      'aberta',
      'usuario',
    ],
    model: {
      prop: 'aberta',
      event: 'toggle-nav',
    },
    computed: {
      fundo() {
        if (this.$vuetify.theme.dark)
          return "black.jpg";
        else
          return "white.jpg";
      },
    },
  };
</script>
