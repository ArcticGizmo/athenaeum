<template>
  <GridLayout class="shelves-page" rows="60 *">
    <!-- search bar -->
    <SearchBar row="0" v-model="text" :hint="searchHint" />

    <ScrollView row="1">
      <StackLayout height="100%">
        <ListView class="shelf-items" for="item in books">
          <v-template>
            <GridLayout>
              <ShelfItem v-bind="item" />
            </GridLayout>
          </v-template>
        </ListView>
      </StackLayout>
    </ScrollView>

    <!-- items -->
  </GridLayout>
</template>

<script>
import SearchBar from '@/components/SearchBar.vue';
import ShelfItem from './ShelfItem.vue';

const BOOKS = [
  {
    title: 'My Book Cover',
    authors: ['My name here', 'A. Barryson', 'Some People'],
    series: '#1 Apple Hats',
    src: 'https://edit.org/images/cat/book-covers-big-2019101610.jpg',
    colors: ['red', 'black'],
  },
  {
    title: 'The King of Drugs',
    authors: 'Nora Barrett',
    src:
      'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/action-thriller-book-cover-design-template-3675ae3e3ac7ee095fc793ab61b812cc_screen.jpg?ts=1588152105',
    colors: ['#E0E7EA', '#05203B'],
  },
  {
    title: 'The Arrival',
    authors: 'Lucas Lloyd',
    src:
      'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/sci-fi-book-cover-template-a1ec26573b7a71617c38ffc6e356eef9.jpg?ts=1561547637',
    colors: ['#1D3247', '#24BAC9', '#B778B7'],
  },
  {
    title: 'Enchantment',
    authors: 'Guy Kawasaki',
    src:
      'https://i0.wp.com/www.creativindie.com/wp-content/uploads/2013/10/Enchantment-Book-Cover-Best-Seller1.jpg',
    colors: ['#8F251B', '#EE4425', '#DDB177'],
  },
  {
    title: 'The Body',
    authors: 'Bill Bryson',
    src: 'https://images4.penguinrandomhouse.com/cover/9780147526922',
    colors: ['#F4F3EE', '#676461'],
  },
];

export default {
  name: 'Shelves',
  components: {
    SearchBar,
    ShelfItem,
  },
  data: () => {
    return {
      books: BOOKS,
      text: '',
      searchHint: 'Find your book',
    };
  },
  methods: {},
};
</script>

<style>
.shelves-page ListView {
  separator-color: transparent;
}
</style>
