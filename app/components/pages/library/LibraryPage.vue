<template>
  <ScrollView class="library-page" orientation="vertical">
    <StackLayout>
      <!-- filters -->
      <Search v-model="searchText" hint="Search Library ..." />
      <FlexboxLayout class="filters" orientation="horizontal" justifyContent="space-around">
        <Button
          v-for="[key, selected] in Object.entries(filters)"
          :class="{ selected }"
          :key="key"
          :text="key"
          :textWrap="false"
          @tap="toggleFilter(key)"
        />
      </FlexboxLayout>

      <!-- books -->
      <BookCard v-for="(book, index) in books" :key="index" :book="book" />
      <Button text="Add Book" @tap="onOpenNewBook()" />
    </StackLayout>
  </ScrollView>
</template>

<script>
import BookCard from './BookCard.vue';
import Search from '../../Search.vue';
import NewBookModal from '~/components/modals/NewBookModal.vue';

export default {
  name: 'LibraryPage',
  components: {
    BookCard,
    Search,
  },
  data: () => {
    return {
      searchText: '',
      filters: {
        owned: true,
        wishlist: true,
        lent: true,
        borrowed: true,
      },
    };
  },
  computed: {
    books() {
      return this.$store.books;
    },
  },
  methods: {
    onOpenNewBook() {
      console.dir('---- add new book');
      this.$modalBus.open(NewBookModal).onClose(resp => {
        console.dir(resp);
        // this.$store.addBook(book);
      });
    },
    toggleFilter(key) {
      this.filters[key] = !this.filters[key];
    },
  },
};
</script>

<style>
.library-page .filters {
  margin: 0;
  padding: 0;
}

.library-page .filters button {
  padding: 0;
  height: 50;
  font-size: 14;
  background-color: gray;
}

.library-page .filters button.selected {
  background-color: cadetblue;
}
</style>
