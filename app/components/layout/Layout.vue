<template>
  <Frame>
    <Page class="zz-layout-page" :actionBarHidden="true">
      <GridLayout rows="* 50">
        <!-- might want to look at how the actual page navigation should look
          because this loads very slowly
         -->
        <StackLayout class="zz-content" row="0">
          <component v-if="selectedPage" :is="selectedPage.component" />
        </StackLayout>
        <NavBar
          row="1"
          :pages="pages"
          :selectedId="(selectedPage || {}).id"
          @select="onPageSelect"
        />

        <ModalManager rowSpan="2" zIndex="10" />
      </GridLayout>
    </Page>
  </Frame>
</template>

<script>
import Header from './Header.vue';
import NavBar from './NavBar.vue';
import ModalManager from '../modals/ModalManager';

export default {
  name: 'Layout',
  components: {
    Header,
    NavBar,
    ModalManager,
  },
  props: {
    pages: { type: Array, default: () => [] },
  },
  data: () => {
    return {
      selectedPage: null,
    };
  },
  mounted() {
    const firstPage = this.pages.find(p => p.default) || this.pages[0];
    if (firstPage) {
      this.selectedPage = firstPage;
    }
  },
  methods: {
    onPageSelect(page) {
      if (page.component) {
        this.selectedPage = page;
      }

      if (page.action) {
        page.action();
      }
    },
  },
};
</script>

<style></style>
