<template>
  <div>
    <h1>{{ hello }} asd</h1>
    <v-btn dark flat class="btn--dark-flat-focused">Focused</v-btn>
  </div>
</template>

<script>
  export default {
    name: 'Hello',
    data() {
      return {
        hello: 'Hello World!'
      };
    }
  };
</script>
