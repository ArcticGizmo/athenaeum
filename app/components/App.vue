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
import DrawerContent from "./DrawerContent";
import Home from "./pages/Home";
import Raw from "./pages/Raw";
import Scanner from "./pages/Scanner";
import { SlideInOnTopTransition } from "nativescript-ui-sidedrawer";

export default {
  components: {
    DrawerContent,
    Home
  },
  data() {
    return {
      startPage: Scanner,
      transition: new SlideInOnTopTransition()
    };
  },
  mounted() {
    this.$navigateTo(this.startPage, {
      clearHistory: true
    });
  }
};
</script>

<style scoped lang="scss">
// Start custom common variables
@import "@nativescript/theme/scss/variables/blue";
// End custom common variables

// Custom styles
</style>
