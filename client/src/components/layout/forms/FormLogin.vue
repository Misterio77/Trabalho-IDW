<template>
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
</template>

<script>
  export default {
    methods: {
      //Fazer login
      async fazerLogin() {
        //Efeito de carregando
        this.loading = true;
        try {
          const resposta = await api.post('/api/usuarios/login', {
            email: this.loginEmail,
            senha: this.loginSenha
          });
          await this.$cookie.set('token', resposta.data.token, '1d');

          await this.quemSou();
          this.loading = false;
          this.loginAberto = false;

        } catch (err) {
          window.console.log(err);
          this.loading = false;
        }
      },
    },
    data() {
      return {
        //Campos do formulario
        campos: {
          email: '',
          senha: '',
        },
      }
    },
  };
</script>
