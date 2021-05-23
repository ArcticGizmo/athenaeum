<template lang="html">
  <RadSideDrawer
    ref="drawer"
    drawerLocation="Left"
    gesturesEnabled="true"
    :drawerTransition="transition"
  >
    <StackLayout ~drawerContent backgroundColor="#ffffff">
      <DrawerContent />
    </StackLayout>
    <Frame ~mainContent ref="drawerMainContent">
      <Home />
    </Frame>
  </RadSideDrawer>
</template>

<script>
import DrawerContent from './DrawerContent';
import Home from './pages/Home';
import Books from './pages/Books';
import { SlideInOnTopTransition } from 'nativescript-ui-sidedrawer';

export default {
  components: {
    DrawerContent,
    Home,
  },
  data() {
    return {
      startPage: Books,
      transition: new SlideInOnTopTransition(),
    };
  },
  mounted() {
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
  background-color: dodgerblue;
  color: white;
  text-transform: capitalize;
}

TextField {
  font-size: 18;
  border-width: 1;
  padding: 5;
}
</style>
