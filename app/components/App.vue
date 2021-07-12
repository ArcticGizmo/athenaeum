<template>
  <Layout :pages="pages" />
</template>

<script>
import Layout from './layout/Layout.vue';
import NewBookModal from './modals/NewBookModal.vue';

import Home from './pages/home/Home';
import Scanner from './pages/Scanner';
import Settings from './pages/Settings.vue';
import ShelvesPage from './pages/shelves/Shelves.vue';
import DevForm from './pages/dev/DevForm.vue';

export default {
  components: {
    Layout,
  },
  data() {
    return {
      pages: [
        { id: 'home', component: Home, icon: 'home' },
        { id: 'shelves', component: ShelvesPage, icon: 'book' },
        { id: 'add', action: this.onAddBook, icon: 'plus' },
        { id: 'dev-form', component: DevForm, icon: 'clipboard', default: true },
        { id: 'settings', component: Settings, icon: 'cog' },
      ],
    };
  },
  mounted() {
    this.$store.load();
  },
  methods: {
    onAddBook() {
      this.$modalBus.open(NewBookModal).onClose(resp => {
        console.dir('---- created book close');
        console.dir(resp);
      });
    },
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
