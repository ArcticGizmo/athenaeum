<template>
  <Frame>
    <Page class="zz-layout-page" :actionBarHidden="true">
      <GridLayout>
        <GridLayout rows="60 *">
          <!-- header -->
          <Header :title="title" @open="onOpen()" />
          <!-- content -->
          <StackLayout row="1" class="zz-content">
            <component v-if="page" :is="page.component" />
          </StackLayout>
        </GridLayout>

        <!-- drawer/sidebar -->
        <Drawer :show="drawerOpen" :pages="pages" @close="onDrawerClose" />

        <!-- modals here -->
        <ModalManager />
      </GridLayout>
    </Page>
  </Frame>
</template>

<script>
import Header from './Header.vue';
import Drawer from './Drawer.vue';
import ModalManager from '../modals/ModalManager';
export default {
  name: 'Layout',
  components: {
    Header,
    Drawer,
    ModalManager,
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
  computed: {
    title() {
      return (this.page || {}).name;
    },
  },
  mounted() {
    const firstPage =
      this.pages.find(p => p.default) || this.pages.filter(p => typeof p !== 'string')[0];
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
