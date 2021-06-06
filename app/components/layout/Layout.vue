<template>
  <Frame>
    <Page class="zz-layout-page">
      <Header @open="onOpen()" />
      <GridLayout>
        <!-- content -->
        <StackLayout class="zz-content">
          <CLabel text="Apples and all the other fuit and stuff" />
        </StackLayout>

        <!-- drawer/sidebar -->
        <Drawer :show="drawerOpen" :pages="pages" @close="onDrawerClose" />

        <!-- modals here -->
      </GridLayout>
    </Page>
  </Frame>
</template>

<script>
import Header from './Header.vue';
import Drawer from './Drawer.vue';
export default {
  name: 'Layout',
  components: {
    Header,
    Drawer,
  },
  props: {
    pages: { type: Array, default: () => [] },
  },
  data: () => {
    return {
      drawerOpen: false,
      page: null,
    };
  },
  mounted() {
    const firstPage = this.pages[0];
    if (firstPage) {
      this.page = firstPage;
    }
  },
  methods: {
    onOpen() {
      this.drawerOpen = !this.drawerOpen;
    },
    onDrawerClose(page) {
      this.drawerOpen = false;
      if (page) {
        this.page = page;
      }
    },
  },
};
</script>

<style></style>
