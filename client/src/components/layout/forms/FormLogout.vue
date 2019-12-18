<template>
<v-dialog
  v-model="logoutAberto"
  max-width="350"
>
  <v-card>
    <v-card-title class="headline">Logout</v-card-title>
    <v-form
      ref="form"
      align="center"
    >

      <v-card-text>
        <v-container fluid>
          <v-row>
            <p>Deseja mesmo encerrar sua sessão? Também pode encerrar as sessões em todos os dispositivos.</p>
          </v-row>
          <v-row>
            <v-checkbox
              color="secondary"
              label="Encerrar todas"
              v-model="logoutTodos"
            ></v-checkbox>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="secondary"
          text
          @click="logoutAberto = false"
          :disabled="loading"
        >
          Cancelar
        </v-btn>
        <v-btn
          type="submit"
          color="secondary"
          text
          @click="fazerLogout(logoutTodos)"
          :loading="loading"
          :disabled="loading"
        >
          Sim
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</v-dialog>
</template>

<script>
export default {
  methods: {
    //Fazer Logout
    async fazerLogout(todos) {
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
  },
  data() {
    return {
      aberta: true,
      //Campo do formulario
      campos: {
        todos: false,
      },
    }
  },
};
</script>
