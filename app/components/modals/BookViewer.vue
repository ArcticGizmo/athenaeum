<template>
  <ScrollView class="book-viewer">
    <StackLayout class="content">
      <!-- book card -->
      <BookCard v-bind="book" />

      <!-- statii -->
      <LV label="Status" text="Reading" />
      <LV label="Status" text="Reading" />
      <LV label="Status" text="Reading" />
      <LV label="Status" text="Reading" />

      <!-- pages -->

      <!-- rating -->

      <!-- review -->

      <!-- tags -->
    </StackLayout>
  </ScrollView>
</template>

<script>
import BookCard from '@/components/pages/shelves/BookCard.vue';
import LV from '@/components/LV.vue';

export default {
  name: 'BookViewer',
  components: {
    BookCard,
    LV,
  },
  props: {
    book: { type: Object, default: null },
  },
  methods: {
    onClose(resp) {
      this.$emit('close', resp);
    },
  },
};
</script>

<style>
.book-viewer {
  height: 100%;
}
.book-viewer .content {
  margin: 10;
}
</style>
