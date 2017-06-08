<template id="events-list">
  <v-flex lg12 md12 sm12 xs12>
    <v-data-table
      v-bind:headers="headers"
      :items="eventsList"
      select-all>
      <template>
      </template>
    </v-data-table>

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
      <v-btn light flat @click.native="snackbar = false">Close</v-btn>
    </v-snackbar>
  </v-flex>
</template>

<script>
  import Vue from 'vue';

  export default Vue.component('events-list', {
    template: '#events-list',
    data: function () {
      return {
        search: '',
        selected: [],
        headers: [
          {text: '#', sortable: false},
          {text: 'Name'},
          {text: 'Course name'},
          {text: 'Status'},
          {text: 'Cyclical'},
          {text: 'Restricted'},
          {text: 'Day'},
          {text: 'Next date'},
          {text: 'Time'},
          {text: ''},
        ],
        eventsList: [],
        snackbar: false,
        context: '',
        mode: '',
        timeout: 6000,
        text: ''
      }
    },
    created: function () {
      this.getEventsList();
    },
    methods: {
      getEventsList: function () {
        this.$http.get('api/events').then(response => {
          this.eventsList = response.body;
        }, fail => {
          console.log('fail');
          this.text = 'Failed to load events';
          this.context = 'error';
          this.snackbar = true;
        });
      }
    }
  })
</script>
