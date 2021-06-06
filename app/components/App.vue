<template>
  <Layout :pages="pages" />
</template>

<script>
import Layout from './layout/Layout.vue';

import Home from './pages/Home';
import Books from './pages/Books';
import Scanner from './pages/Scanner';
import Settings from './pages/Settings.vue';

const PAGES = [
  { name: 'Home', component: Home, icon: 'home' },
  { name: 'Books', component: Books, icon: 'book', default: true },
  'gap',
  { name: 'Add Book', component: Scanner, icon: 'barcode' },
  'gap',
  { name: 'Settings', component: Settings, icon: 'cog' },
];

export default {
  components: {
    Layout,
  },
  data() {
    return {
      pages: PAGES,
    };
  },
  mounted() {
    this.$store.load();
  },
};
</script>

<style scoped lang="scss">
// Start custom common variables
@import '@nativescript/theme/scss/variables/blue';
// End custom common variables

// Custom styles
button {
  font-size: 18;
  background-color: cadetblue;
  color: white;
  text-transform: capitalize;
}

TextField {
  font-size: 18;
  border-width: 1;
  padding: 5;
}
</style>
