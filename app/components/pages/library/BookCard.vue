<template>
  <GridLayout class="book-card" columns="100 *">
    <GridLayout col="0" class="left" rows="* 2* *">
      <!-- status -->
      <CLabel
        v-if="status"
        class="status"
        :class="status"
        row="0"
        :text="status"
        textOrientation="right"
      />

      <!-- image spot -->
      <!-- <Image /> -->
      <Icon class="book-icon" rowSpan="4" icon="book" />

      <!-- rating -->
      <RatingField row="3" class="rating" :value="3" :hideIfEmpty="true" />
    </GridLayout>

    <StackLayout class="right" col="1">
      <!-- title -->
      <CLabel class="title" :text="book.title" :textWrap="true" />

      <!-- series -->
      <CLabel v-if="series" class="series" :text="series" />

      <!-- authors -->
      <CLabel class="authors" :text="book.authors.join(', ') || '-No Author-'" />
    </StackLayout>
  </GridLayout>
</template>

<script>
import RatingField from '../../form/RatingField.vue';

export default {
  name: 'BookCard',
  components: {
    RatingField,
  },
  props: {
    book: { type: Object, default: () => ({}) },
  },
  computed: {
    status() {
      return null;
    },
    series() {
      const series = this.book.series;

      if (series) {
        return `${series} (#${this.book.seriesIndex})`;
      }

      return null;
    },
  },
};
</script>

<style>
.book-card {
  height: 130;
  border-bottom-width: 2;
  border-bottom-color: #f2f2f2;
  padding: 10 0;
}

.book-card .image {
}

.book-card .book-icon {
  font-size: 40;
  opacity: 0.75;
  border-right-width: 1;
  border-right-color: #f2f2f2;
}

.book-card .title {
  font-size: 20;
}

.book-card .series {
  font-size: 16;
  font-style: italic;
}

.book-card .authors {
  font-size: 14;
}

.book-card .status.lent {
  background-color: rgba(0, 0, 0, 0.3);
}

.book-card .status.wishlist {
  background-color: rgba(95, 158, 160, 0.3);
}

.book-card .status.reading {
  background-color: rgba(21, 255, 0, 0.3);
}
</style>
