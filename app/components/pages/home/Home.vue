<template>
  <ScrollView class="home-page" orientation="vertical">
    <StackLayout>
      <!-- recent books list -->
      <ScrollView orientation="horizontal" scrollBarIndicatorVisible="false">
        <StackLayout class="book-carosel" orientation="horizontal">
          <Button class="book" v-for="item in books" :key="item" :text="`Book ${item}`" />
        </StackLayout>
      </ScrollView>

      <!-- icon summary -->
      <FlexboxLayout class="icon-summary" alignItems="center" justifyContent="space-around">
        <!-- <StackLayout class="icon-summary" orientation="horizontal" width="100%" horizontalAlignment="center"> -->
        <GridLayout
          class="icon-summary-item"
          rows="* *"
          v-for="(item, index) in iconSummary"
          :key="index"
        >
          <Icon row="0" :icon="item.icon" />
          <CLabel row="1" :text="item.count" />
        </GridLayout>
        <!-- </StackLayout> -->
      </FlexboxLayout>

      <!-- rating summary -->
      <GridLayout class="rating-summary" rows="* * * *" columns="* *">
        <!-- overall rating -->
        <CLabel row="1" class="average" :text="ratingSummary.avg.toFixed(1)" />
        <!-- stars -->

        <!-- averages -->
        <StackLayout rowSpan="4" col="1">
          <GridLayout
            height="20%"
            columns="30 *"
            v-for="(item, index) in ratingSummary.items.reverse()"
            :key="index"
            horizontalAlignment="left"
          >
            <CLabel class="rating" :text="5 - index" />
            <StackLayout col="1">
              <GridLayout
                class="bar"
                :class="`rating-${5 - index}`"
                height="100%"
                :width="`${item.size * 100}%`"
              />
            </StackLayout>
          </GridLayout>
        </StackLayout>
      </GridLayout>

      <!-- upcoming things, lent books, upcoming reads -->
    </StackLayout>
  </ScrollView>
</template>

<script>
const ICON_SUMMARY = [
  { icon: 'book', count: 57 },
  { icon: 'bookmark', count: 99 },
  { icon: 'book-open', count: 3 },
  { icon: 'star', count: 4 },
  { icon: 'hand-heart', count: 1 },
];

export default {
  name: 'Home',
  data: () => {
    return {
      books: [1, 2, 3, 4, 5],
      iconSummary: ICON_SUMMARY,
    };
  },
  computed: {
    ratingSummary() {
      const counts = {
        1: 10,
        2: 5,
        3: 21,
        4: 45,
        5: 20,
      };

      const stats = Object.entries(counts).reduce(
        (acc, [rating, count]) => {
          acc.stars += rating * count;
          acc.count += count;

          if (count > acc.max) {
            acc.max = count;
          }
          return acc;
        },
        { stars: 0, count: 0, max: 0 },
      );

      const items = [1, 2, 3, 4, 5].map(rating => {
        return { count: counts[rating] || 0, size: (counts[rating] / stats.max) * 0.8 };
      });

      const avg = stats.stars / stats.count;

      return {
        avg,
        items,
      };
    },
  },
};
</script>

<style>
/* book carosel */
.home-page .book-carosel {
  height: 160;
}

.home-page .book-carosel .book {
  height: 100%;
  width: 100;
}

/* Icon summary */
.home-page .icon-summary {
  padding: 20;
  margin: 20;
  height: 120;
  background-color: #f6f6f6;
  border-radius: 30;
}

.home-page .icon-summary-item {
  width: 50;
  border-radius: 25;
  background-color: white;
}

.home-page .icon-summary-item .c-label {
  font-size: 20;
  color: black;
}

/* rating summary */
.home-page .rating-summary {
  height: 240;
  background-color: #f6f6f6;
  padding: 20;
  margin: 0 20;
  border-radius: 30;
}

.home-page .rating-summary .average {
  font-size: 40;
}

.home-page .rating-summary .rating {
  font-size: 20;
}

.home-page .rating-summary .bar {
  margin: 5 0;
}

.home-page .rating-summary .bar.rating-1 {
  background-color: red;
}

.home-page .rating-summary .bar.rating-2 {
  background-color: orange;
}

.home-page .rating-summary .bar.rating-3 {
  background-color: yellow;
}

.home-page .rating-summary .bar.rating-4 {
  background-color: green;
}

.home-page .rating-summary .bar.rating-5 {
  background-color: darkgreen;
}
</style>
