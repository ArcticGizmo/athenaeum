<template>
  <Page class="page">
    <ActionBar class="action-bar">
      <NavigationButton visibility="hidden" />
      <GridLayout columns="50, *">
        <Label class="action-bar-title" text="Home" colSpan="2" />

        <Label class="fas" text.decode="&#xf0c9;" @tap="onDrawerButtonTap" />
      </GridLayout>
    </ActionBar>

    <ScrollView orientation="vertical">
      <!-- may want to use a list view here instead -->
      <StackLayout>
        <BookCard v-for="(book, index) in books" :key="index" :book="book" @tap.native="onTap()" />
      </StackLayout>
    </ScrollView>
    <!-- <GridLayout class="page__content">
      <Label class="page__content-icon fas" text.decode="&#xf015;" />
      <Label class="page__content-placeholder" :text="message" />
    </GridLayout> -->
  </Page>
</template>

<script>
import * as utils from '@/shared/utils';
import { SelectedPageService } from '@/shared/selected-page-service';
import BookCard from '../BookCard.vue';
import ConfirmModal from '../modals/ConfirmModal.vue';

export default {
  components: {
    BookCard,
  },
  computed: {
    books() {
      return this.$store.books;
    },
  },
  mounted() {
    SelectedPageService.getInstance().updateSelectedPage('Home');
  },
  methods: {
    onDrawerButtonTap() {
      utils.showDrawer();
    },
    onTap() {
      console.dir('--- apple')
      this.$modalBus.open(ConfirmModal, { message: 'egg' });
    },
  },
};
</script>

<style scoped lang="scss">
// Start custom common variables
@import '@nativescript/theme/scss/variables/blue';
// End custom common variables

// Custom styles
</style>
