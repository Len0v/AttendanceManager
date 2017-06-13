<template id="events-list">
  <v-flex lg12 md12 sm12 xs12>
    <v-data-table
      v-bind:headers="headers"
      :items="eventsList"
      select-all
      :hide-actions="hide_actions"
      :loading='isLoading'
      class="custom-data-table">
      <template>
      </template>
    </v-data-table>
  </v-flex>
</template>

<script>
  import Vue from 'vue';

  export default Vue.component('events-list', {
    template: '#events-list',
    data: function () {
      return {
        hide_actions: true,
        isLoading: false,
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
          {text: '', sortable: false},
        ],
        eventsList: [],
        showNotification: false,
        context: null,
        text: null
      }
    },
    created: function () {
      this.getEventsList();
    },
    methods: {
      getEventsList: function () {
        this.isLoading = true;
        this.$http.get('api/events/incoming').then(response => {
          this.isLoading = false;
          this.hide_actions = false;
        }, fail => {
          this.$store.commit('displaySnackbar', {context: 'error', text: 'Failed to load events'});
          this.isLoading = false;
        });
      }
    }
  })
</script>

<style>
  .custom-data-table {
    height: 100%;
  }
</style>
