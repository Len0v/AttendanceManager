<template id="navbar">
  <v-flex xs12 sm12 md12 xl12>
    <v-toolbar class="deepblue" light>
      <v-menu bottom right>
        <v-btn icon="icon" slot="activator" light>
          <v-icon>more_vert</v-icon>
        </v-btn>
        <v-list>
          <v-list-item>
            <v-list-tile routes to="events">
              <v-list-tile-title>Events list</v-list-tile-title>
            </v-list-tile>
          </v-list-item>
          <v-list-item>
            <v-list-tile routes to="error">
              <v-list-tile-title>Add event</v-list-tile-title>
            </v-list-tile>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-toolbar-title class="hidden-sm-and-down">Toolbar</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon light router to="/home">
        <v-icon>account_circle</v-icon> Login
      </v-btn>
    </v-toolbar>
  </v-flex>
</template>

<script>
  import Vue from 'vue';

  export default Vue.component('navbar-component', {
    template: '#navbar'
  });
</script>
