<template>
  <div>

    <!-- Gaveta de navegação -->
    <v-navigation-drawer v-model="navAberta" fixed disable-resize-watcher temporary>

      <v-img v-if="this.$vuetify.theme.dark" align="center" height="210px" src="../../../assets/black.jpg">
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

      <v-img v-else align="center" height="210px" src="../../../assets/white.jpg">
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

    <!-- Tela de registro -->
    <v-dialog v-model="registroAberto" max-width="350">
      <v-card>
        <v-card-title class="headline">Registrar</v-card-title>
        <v-form ref="form" align="center">
          <v-card-text>
            <v-container fluid v-on:keyup.enter="fazerRegistro">
              <v-text-field v-model="registroNome" autocomplete="name" label="Nome Completo" color="secondary" prepend-icon="mdi-account-details" outlined></v-text-field>
              <v-text-field v-model="registroEmail" autocomplete="email" type="email" label="Email" color="secondary" prepend-icon="mdi-email" outlined></v-text-field>
              <v-text-field v-model="registroSenha" autocomplete="new-password" :type="'password'" label="Senha" color="secondary" prepend-icon="mdi-lock" outlined></v-text-field>
              <v-text-field v-model="registroEndereco" autocomplete="street-address" label="Endereço" color="secondary" prepend-icon="mdi-home-city" outlined></v-text-field>
              <v-text-field v-model="registroTelefone" autocomplete="tel" label="Telefone" color="secondary" prepend-icon="mdi-cellphone" outlined></v-text-field>


            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="secondary" text @click="registroAberto = false" :disabled="loading">
              Cancelar
            </v-btn>
            <v-btn color="secondary" text @click="fazerRegistro" :loading="loading" :disabled="loading">
              Registrar
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>

    <!-- Tela de login -->
    <v-dialog v-model="loginAberto" max-width="350">
      <v-card>
        <v-card-title class="headline">Login</v-card-title>
        <v-btn text color="secondary" @click="registroAberto = true">Ainda não tem conta?</v-btn>
        <v-form ref="form" align="center">
          <v-card-text>
            <v-container fluid>
              <v-text-field v-model="loginEmail" type="email" label="Email" color="secondary" prepend-icon="mdi-email" outlined></v-text-field>
              <v-text-field v-model="loginSenha" :type="'password'" label="Senha" color="secondary" prepend-icon="mdi-lock" outlined></v-text-field>

            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="secondary" text @click="loginAberto = false" :disabled="loading">
              Cancelar
            </v-btn>
            <v-btn type="submit" color="secondary" text @click="fazerLogin" :loading="loading" :disabled="loading">
              Login
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>

    <!-- Tela de logout -->
    <v-dialog v-model="logoutAberto" max-width="350">
      <v-card>
        <v-card-title class="headline">Logout</v-card-title>
        <v-form ref="form" align="center">

          <v-card-text>
            <v-container fluid>
              <v-row>
                <p>Deseja mesmo encerrar sua sessão? Também pode encerrar as sessões em todos os dispositivos.</p>
              </v-row>
              <v-row>
                <v-checkbox color="secondary" label="Encerrar todas" v-model="logoutTodos"></v-checkbox>
              </v-row>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="secondary" text @click="logoutAberto = false" :disabled="loading">
              Cancelar
            </v-btn>
            <v-btn type="submit" color="secondary" text @click="fazerLogout(logoutTodos)" :loading="loading" :disabled="loading">
              Sim
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>

    <!-- Barra do app -->
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
          <v-btn icon v-on="on" @click="escuro()">
            <v-icon>mdi-brightness-6</v-icon>
          </v-btn>
        </template>
        <span>Modo noturno</span>
      </v-tooltip>
    </v-app-bar>
  </div>
</template>
<script>
  import axios from 'axios';
  const api = axios.create({
    baseURL: (process.env.NODE_ENV === 'production') ? process.env.BACKEND : ''
  });

  export default {
    methods: {
      //Função para abrir o menu de navegação
      abrirNav: function() {
        this.navAberta = !this.navAberta;
        this.quemSou();
      },

      //Modo noturno manual
      escuro: function() {
        this.$vuetify.theme.dark = !(this.$vuetify.theme.dark);
      },

      //Função para deslogar
      fazerLogout: async function(todos) {
        this.loading = true;

        if (todos) {
          await api.post('/api/usuarios/logout/todos', null, {
            'headers': {
              'Authorization': this.$cookie.get('token')
            }
          });
        } else {
          await api.post('/api/usuarios/logout', null, {
            'headers': {
              'Authorization': this.$cookie.get('token')
            }
          });

          this.logoutTodos = false;
        }

        //Verificar que está deslogado e guardar essa informação
        await this.quemSou();
        this.logoutAberto = false;
        this.loading = false;
      },

      //Fazer login
      fazerLogin: async function() {
        //Efeito de carregando
        this.loading = true;
        try {
          const resposta = await api.post('/api/usuarios/login', {
            email: this.loginEmail,
            senha: this.loginSenha
          });
          await this.$cookie.set('token', resposta.data.token);

          await this.quemSou();
          this.loading = false;
          this.loginAberto = false;

        } catch (err) {
          window.console.log(err);
          this.loading = false;
        }
      },

      //Fazer registro
      fazerRegistro: async function() {
        //Efeito de carregando
        this.loading = true;
        try {
          const resposta = await api.post('/api/usuarios/', {
            nome: this.registroNome,
            email: this.registroEmail,
            senha: this.registroSenha,
            endereco: this.registroEndereco,
            telefone: this.registroTelefone
          });
          await this.$cookie.set('token', resposta.data.token);

          await this.quemSou();
          this.loading = false;
          this.registroAberto = false;
          this.loginAberto = false;

        } catch (err) {
          window.console.log(err);
          this.loading = false;
        }
      },

      //Utiliza o Token guardado (se existir), para obter informações do usuário logado
      quemSou: async function() {
        try {
          this.usuario = await api.get('/api/usuarios/eu', {
            'headers': {
              'Authorization': this.$cookie.get('token')
            }
          });
          window.console.log("logado");
          this.logado = await true;

          this.usuarioNome = this.usuario.data.nome;
          this.usuarioEmail = this.usuario.data.email;
          this.usuarioId = this.usuario.data._id;
          this.usuarioImagem = this.usuario.data.imagem;
          this.usuarioAdmin = this.usuario.data.admin;

        } catch {
          window.console.log("deslogado");
          this.logado = false;
          this.usuarioAdmin = false;
        }
      }
    },
    //Quando o documento é criado, vamos verificar se o usuário está com darkmode no seu dispositivo
    created: async function() {
      this.$vuetify.theme.dark = await window.matchMedia('(prefers-color-scheme: dark)').matches;
      await this.quemSou();
      window.console.log(this.logado);
      this.loading = false;
    },
    //Essa checagem inicial NÃO retorna corretamente se for colocada no created, então o updated é melhor opção. O this.pronto serve para evitar abrir a gaveta seme a requisição estar pronta
    activated: async function() {

    },

    //Dados armazenados
    data: () => ({
      //Campos do usuario que usamos com frequencia
      usuarioNome: '',
      usuarioEmail: '',
      usuarioId: '',
      usuarioAdmin: false,

      //Logado é a nossa suposição de que se o usuario está logado. Assim evitamos ter que verificar toda vez que abrirmos o painel
      logado: false,

      //Aqui armazenamos o objeto do usuario logado
      usuario: null,

      //Campos de formulario
      loginEmail: '',
      loginSenha: '',
      logoutTodos: false,
      
      registroNome: '',
      registroEmail: '',
      registroSenha: '',
      registroEndereco: '',
      registroTelefone: '',

      //Variaveis que ditam a abertura dos menus
      navAberta: false,
      loginAberto: false,
      logoutAberto: false,
      registroAberto: false,

      //Fundo correto para o menu
      fundo: '',

      //Variavel que dita bloquear o botao e colocar uma rodinha de carregando
      loading: true,
    }),

  };
</script>
<style scoped>

</style>
