<template>
  <ScrollView class="library-page" orientation="vertical">
    <StackLayout>
      <!-- filters -->
      <Search v-model="searchText" hint="Search Library ..." />
      <GridLayout class="filters" columns="* *">
        <Button col="0" :text="selectedShelfText" @tap="onOpenShelf()" />
        <!-- this should show what it is being sorted by and an arrow to change direction -->
        <Button col="1" text="Sort By" @tap="onOpenSort()" />
      </GridLayout>

      <!-- books -->
      <BookCard v-for="(book, index) in books" :key="index" :book="book" />
      <Button text="Add Book" @tap="onOpenNewBook()" />
      <!-- <Button v-if="searchText.length > minSearchLength" text="Add Book" @tap="onOpenNewBook()" /> -->
    </StackLayout>
  </ScrollView>
</template>

<script>
import BookCard from './BookCard.vue';
import Search from '../../Search.vue';
import NewBookModal from '~/components/modals/NewBookModal.vue';
import MultiSelectModal from '~/components/modals/MultiSelectModal.vue';
import ConfirmModal from '~/components/modals/ConfirmModal.vue';
/*
binding
- hardcover
- paperback
- ebook
- audiobook

format
- Mass Market (small books)
- Library Binding
- B format
- American B format
- Tradesize
- 
*/

export default {
  name: 'LibraryPage',
  components: {
    BookCard,
    Search,
  },
  data: () => {
    const shelves = ['owned', 'lent', 'wishlist', 'borrowed'];
    const selectedShelves = shelves.slice();
    return {
      searchText: '',
      minSearchLength: 3,
      shelves,
      selectedShelves,
      sortByKeys: ['author', 'rating', 'pages', 'series', 'dateAdded'],
      sortByKey: null,
      sortAsc: true,
      check: false,
    };
  },
  computed: {
    books() {
      return this.$store.books;
    },
    selectedShelfText() {
      const sLength = this.selectedShelves.length;
      const oLength = this.shelves.length;

      if (sLength === 0) {
        return 'No Shelves';
      }

      if (sLength === oLength) {
        return 'All Shelves';
      }

      if (sLength === 1) {
        return this.selectedShelves[0];
      }

      return 'Multiple Shelves';
    },
  },
  methods: {
    onOpenNewBook() {
      this.$modalBus.open(NewBookModal).onClose(resp => {
        this.$store.addBook(book);
      });
    },
    onOpenShelf() {
      const opts = {
        options: this.shelves,
        selected: this.selectedShelves,
      };

      this.$modalBus.open(MultiSelectModal, opts).onClose(resp => {
        if (resp) {
          this.selectedShelves = resp;
        }
      });
    },
    onOpenSort() {
      const opts = {
        body: 'apples',
      };

      this.$modalBus.open(ConfirmModal, opts);
    },
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
