<template>
  <ScrollView class="library-page" orientation="vertical">
    <StackLayout>
      <!-- filters -->
      <Search v-model="searchText" hint="Search Library ..." />
      <GridLayout class="filters" columns="* *">
        <Button col="0" text="Shelf" />
        <!-- this should show what it is being sorted by and an arrow to change direction -->
        <Button col="1" text="Sort By" />
      </GridLayout>

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
      shelves: [],
      sortByKey: [],
      sortAsc: true,
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
    onOpenShelf() {},
    onOpenSort() {},
    onToggleSortDirection() {
      this.sortAsc = !this.sortAsc;
    },
  },
};
</script>

<style>
.library-page .filters {
  height: 45;
  margin: 0 10;
}

.library-page .filters button {
  margin: 0;
}
</style>
