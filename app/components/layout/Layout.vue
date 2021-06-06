<template>
  <Frame>
    <Page class="zz-layout-page">
      <Header :title="title" @open="onOpen()" />

      <GridLayout>
        <!-- content -->
        <StackLayout class="zz-content">
          <component v-if="page" :is="page.component" />
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
  computed: {
    title() {
      return (this.page || {}).name;
    },
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
