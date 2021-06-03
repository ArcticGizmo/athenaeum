<template>
  <GridLayout>
    <RadSideDrawer
      ref="drawer"
      drawerLocation="Left"
      gesturesEnabled="true"
      :drawerTransition="transition"
    >
      <StackLayout ~drawerContent backgroundColor="#ffffff">
        <DrawerContent />
        <ModalManager />
      </StackLayout>
      <Frame ~mainContent ref="drawerMainContent">
        <Home />
      </Frame>
    </RadSideDrawer>
    <ModalManager />
  </GridLayout>
</template>

<script>
import DrawerContent from './DrawerContent';
import Home from './pages/Home';
import Books from './pages/Books';
import { SlideInOnTopTransition } from 'nativescript-ui-sidedrawer';
import ModalManager from './modals/ModalManager.vue';

export default {
  components: {
    DrawerContent,
    Home,
    ModalManager,
  },
  data() {
    return {
      startPage: Home,
      transition: new SlideInOnTopTransition(),
    };
  },
  mounted() {
    this.$store.load();
    this.$navigateTo(this.startPage, {
      clearHistory: true,
    });
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
