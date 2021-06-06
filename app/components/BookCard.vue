<template>
  <GridLayout class="book-card" rows="* * *" columns="100 *">
    <!-- status -->
    <CLabel v-if="status" row="0" col="0" :text="status" textOrientation="right" />

    <!-- image spot -->
    <CLabel
      :row="status ? 1 : 0"
      rowSpan="3"
      col="0"
      class="nt-icon fas image"
      :text="String.fromCharCode(bookIcon)"
    />

    <!-- title -->
    <CLabel row="0" col="1" class="title" :text="book.title" />

    <!-- author (S) -->
    <CLabel row="1" col="1" class="authors" :text="book.authors.join(', ') || '--'" />

    <!-- rating -->
    <RatingField row="2" col="1" :value="3" />
  </GridLayout>
</template>

<script>
import RatingField from './form/RatingField.vue';
const BOOK_ICON = 0xf02d;

export default {
  name: 'BookCard',
  components: {
    RatingField,
  },
  props: {
    book: { type: Object, default: () => ({}) },
  },
  data: () => {
    return {
      bookIcon: BOOK_ICON,
    };
  },
  computed: {
    status() {
      return null;
    },
  },
  mounted() {
    console.dir(this.book);
  },
};
</script>

<style>
.book-card {
  height: 130;
  border-width: 1;
  border-bottom-color: black;
  padding: 10 0;
}

.book-card .image {
  border-right-width: 1;
  border-right-color: black;
}

.book-card .title {
  font-size: 20;
}

.book-card .authors {
  font-size: 20;
}
</style>
