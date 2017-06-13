<template id="notifications">
  <v-snackbar
    :timeout="timeout"
    :success="context === 'success'"
    :info="context === 'info'"
    :warning="context === 'warning'"
    :error="context === 'error'"
    :primary="context === 'primary'"
    :secondary="context === 'secondary'"
    :top="true"
    v-model="snackbar"
  >
    {{ text }}
    <v-btn light flat @click.native="hideSnackbar()">Close</v-btn>
  </v-snackbar>
</template>

<script>
  import Vue from 'vue';

  export default Vue.component('notifications', {
    data: function () {
      return {
        mode: '',
        timeout: 6000,
      }
    },
    methods: {
      hideSnackbar() {
        this.$store.commit('hideSnackbar')
      }
    },
    computed: {
      context () {
        return this.$store.state.context;
      },
      text (){
        return this.$store.state.text;
      },
      snackbar (){
        return this.$store.state.snackbar;
      }
    }
  });
</script>
