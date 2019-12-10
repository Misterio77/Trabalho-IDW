<template>
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
</template>

<script>
  export default {
    methods: {
      //Fazer registro
      async fazerRegistro() {
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
    },
    data() {
      return {
        aberta: true,
        campos: {
          nome: '',
          email: '',
          senha: '',
          endereco: '',
          telefone: '',
        },
      }
    },
  };
</script>
