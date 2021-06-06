<template>
  <Layout :pages="pages" />
  <!-- <GridLayout rows="90 *">
    <RadSideDrawer
      rowSpan="2"
      ref="drawer"
      drawerLocation="Left"
      gesturesEnabled="true"
      :drawerTransition="transition"
    >
      <StackLayout ~drawerContent backgroundColor="#ffffff">
        <DrawerContent />
      </StackLayout>

      <Frame ~mainContent ref="drawerMainContent">
        <component :is="startPage" />
      </Frame>
    </RadSideDrawer>

    <ModalManager rowSpan="2" @tap.native="onCloseDrawer()" />
    <GridLayout row="0" @tap="openDrawer()" />
  </GridLayout> -->
</template>

<script>
import Home from './pages/Home';
import Books from './pages/Books';
import Layout from './layout/Layout.vue';

const PAGES = [
  { name: 'Home', component: Home },
  { name: 'Books', component: Books },
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
  methods: {},
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
