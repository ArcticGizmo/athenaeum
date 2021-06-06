<template>
  <GridLayout class="book-card" rows="* * * *" columns="100 *">
    <!-- image spot -->
    <!-- <Image /> -->
    <Icon class="book-icon" :row="status ? 1 : 0" rowSpan="4" col="0" icon="book" />

    <!-- status -->
    <CLabel v-if="status" class="status" row="0" col="0" :text="status" textOrientation="right" />

    <!-- rating -->
    <RatingField row="3" class="rating" col="0" :value="3"  :hideIfEmpty="true" />

    <!-- title -->
    <CLabel row="0" col="1" class="title" :text="book.title" />

    <!-- author (S) -->
    <CLabel row="1" col="1" class="authors" :text="book.authors.join(', ') || '--'" />
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
      return 'Lent';
    },
  },
  mounted() {
    // console.dir(this.book);
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

.book-card .book-icon {
  font-size: 40;
  opacity: 0.75;
}

.book-card .title {
  font-size: 20;
}

.book-card .authors {
  font-size: 20;
}

.book-card .status {
  background-color: rgba(95, 158, 160, 0.329);
}
</style>
