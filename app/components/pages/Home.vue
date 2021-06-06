<template>
  <ScrollView orientation="vertical">
    <!-- may want to use a list view here instead -->
    <StackLayout>
      <BookCard v-for="(book, index) in books" :key="index" :book="book" @tap.native="onTap()" />
    </StackLayout>
  </ScrollView>
</template>

<script>
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
  methods: {
    onTap() {
      console.dir('--- apple');
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
