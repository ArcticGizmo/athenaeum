<template>
  <Layout :pages="pages" />
</template>

<script>
import Layout from './layout/Layout2.vue';

import Home from './pages/home/Home';
import Scanner from './pages/Scanner';
import Settings from './pages/Settings.vue';
import ShelvesPage from './pages/shelves/Shelves.vue';

const PAGES = [
  { id: 'home', component: Home, icon: 'home', default: true },
  { id: 'shelves', component: ShelvesPage, icon: 'book' },
  { id: 'scanner', component: Scanner, icon: 'barcode' },
  { id: 'settings', component: Settings, icon: 'cog' },
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
