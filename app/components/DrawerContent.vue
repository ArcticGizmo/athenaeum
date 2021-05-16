<template lang="html">
  <GridLayout rows="auto, *" class="nt-drawer__content">
    <StackLayout row="0" class="nt-drawer__header">
      <Image
        class="nt-drawer__header-image fas t-36"
        src.decode="font://&#xf2bd;"
      />
      <Label class="nt-drawer__header-brand" text="User Name" />
      <Label class="nt-drawer__header-footnote" text="username@mail.com" />
    </StackLayout>

    <ScrollView row="1" class="nt-drawer__body">
      <StackLayout>
        <template v-for="(item, index) in navItems">
          <StackLayout v-if="item.gap" :key="`gap-${index}`" class="hr" />

          <GridLayout
            v-else
            :key="`item-${index}`"
            columns="auto, *"
            class="nt-drawer__list-item"
            :class="getItemClass(item)"
            @tap="onNavigationItemTap(item.component)"
          >
            <Label
              col="0"
              :text="String.fromCharCode(item.icon)"
              class="nt-icon fas"
            />
            <Label col="1" :text="item.label" class="p-r-10" />
          </GridLayout>
        </template>
      </StackLayout>
    </ScrollView>
  </GridLayout>
</template>

<script>
import Home from "./pages/Home";
import Browse from "./pages/Browse";
import Featured from "./pages/Featured";
import Search from "./pages/Search";
import Settings from "./pages/Settings";
import Raw from "./pages/Raw";
import Scanner from "./pages/Scanner";

import * as utils from "@/shared/utils";
import { SelectedPageService } from "@/shared/selected-page-service";

const ICONS = {
  home: 0xf015,
  newspaper: 0xf1ea,
  search: 0xf002,
  star: 0xf005,
  cog: 0xf013,
  code: 0xf121,
  barcode: 0xf02a
};

export default {
  // components: {
  //   Home,
  //   Browse,
  //   Featured,
  //   Search,
  //   Settings
  // },
  data() {
    return {
      Home: Home,
      Browse: Browse,
      Featured: Featured,
      Search: Search,
      Settings: Settings,
      selectedPage: "",
      navItems: [
        { label: "Home", icon: ICONS.home, component: Home },
        { label: "Browse", icon: ICONS.newspaper, component: Browse },
        { label: "Search", icon: ICONS.search, component: Search },
        { label: "Featured", icon: ICONS.star, component: Featured },
        { label: "Scanner", icon: ICONS.barcode, component: Scanner },
        { gap: true },
        { label: "Raw", icon: ICONS.code, component: Raw },
        { label: "Settings", icon: ICONS.cog, component: Settings }
      ]
    };
  },
  mounted() {
    SelectedPageService.getInstance().selectedPage$.subscribe(
      selectedPage => (this.selectedPage = selectedPage)
    );
  },
  methods: {
    onNavigationItemTap(component) {
      this.$navigateTo(component, {
        clearHistory: true
      });
      utils.closeDrawer();
    },
    getItemClass(item) {
      if (item.name === this.selectedPage) {
        return "nt-drawer__list-item-selected";
      } else {
        return "nt-drawer__list-item";
      }
    }
  }
};
</script>

<style scoped lang="scss">
// Start custom common variables
@import "@nativescript/theme/scss/variables/blue";
// End custom common variables

// Custom styles
</style>
