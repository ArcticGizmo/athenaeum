<template>
  <Layout />
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
import DrawerContent from './DrawerContent';
import Home from './pages/Home';
import Books from './pages/Books';
import { SlideInOnTopTransition } from 'nativescript-ui-sidedrawer';
import ModalManager from './modals/ModalManager.vue';
import Layout from './layout/Layout.vue';

export default {
  components: {
    Layout,
    DrawerContent,
    Home,
    ModalManager,
  },
  data() {
    return {
      drawerOpen: false,
      startPage: Home,
      transition: new SlideInOnTopTransition(),
    };
  },
  mounted() {
    this.$store.load();
  },
  methods: {
    openDrawer() {
      this.$refs.drawer.showDrawer();
      this.drawerOpen = true;
    },
    onCloseDrawer() {
      if (this.drawerOpen) {
        this.$refs.drawer.closeDrawer();
        this.drawerOpen = false;
      }
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
