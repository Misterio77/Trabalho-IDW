<template>
</template>

<script>


  export default {
    methods: {
      atualizarToken() {
        this.token = this.$cookie.get('token');
      }
    },
    data() {
      return {
        token: null,
      }
    }
    computed: {
      usuario() {
        try {
          const usuario = await api.get('/api/usuarios/eu', {
            'headers': {
              'Authorization': this.token
            }
          });
        } catch {
          const usuario = null;
        }
        return usuario;
      }
      logado: () => (this.usuario !== null),
    }
  };
</script>
