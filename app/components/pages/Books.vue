<template>
  <ScrollView class="books-page" orientation="vertical">
    <StackLayout>
      <Button class="scanner" text="Scan" @tap="onScan()" />
      <Form v-model="bookData" />
      <Button class="submit" text="Create" @tap="onSubmit()" />
    </StackLayout>
  </ScrollView>
</template>

<script>
import Form from '../form/Form.vue';
import { validator } from '../form/form.js';
import { getByISBN } from '@/code/google.js';
import { scan } from '@/code/scanner.js';

const UNITS = ['cm', 'mm', 'inch'];

export default {
  name: 'BooksPage',
  components: {
    Form,
  },
  data: () => {
    return {
      bookData: {
        title: {
          type: 'string',
          value: null,
          max: 255,
          validators: [validator('required')],
        },
        authors: {
          type: 'array',
          value: [''],
          min: 1,
        },
        isbn: {
          type: 'number',
          value: null,
          max: 13,
          validators: [
            validator('min-length', 10, 'digits'),
            validator('max-length', 13, 'digits'),
          ],
        },
        blurb: {
          type: 'string',
          value: null,
        },
        rating: {
          type: 'rating',
          value: null,
          stars: 5,
          allowHalves: true,
        },
        binding: {
          value: null,
          type: 'dropdown',
        },
        pages: {
          type: 'number',
          value: null,
          validators: [validator('required')],
        },
        height: {
          type: 'measure',
          units: UNITS,
          value: { measure: null, unit: 'cm' },
          validators: [validator('required')],
        },
        width: {
          type: 'measure',
          unit: UNITS,
          value: { measure: null, unit: 'cm' },
          validators: [validator('required')],
        },
        thickness: {
          type: 'measure',
          unit: UNITS,
          value: { measure: null, unit: 'cm' },
          validators: [validator('required')],
        },
        notes: {
          type: 'string',
          value: null,
        },
      },
    };
  },
  methods: {
    onScan() {
      scan().then(resp => this.fetchBook(resp.text));
    },
    fetchBook(isbn) {
      this.$toaster.info('Fetching book info ...');
      getByISBN(isbn)
        .then(book => {
          this.$toaster.info('Complete!');
          this.bookData.title.value = book.title;
          this.bookData.isbn.value = book.isbn;
          if ((book.authors || []).length) {
            this.bookData.authors.value = book.authors;
          }
          this.bookData.blurb.value = book.blurb;
          this.bookData.pages.value = book.pages;
        })
        .catch(() => {
          this.$toaster.error('Something went wrong');
        });
    },
    onSubmit() {
      // need to do a validation check here
      const book = {
        title: this.bookData.title.value,
        authors: this.bookData.authors.value,
        isbn: this.bookData.isbn.value,
        blurb: this.bookData.blurb.value,
        rating: this.bookData.rating.value,
        binding: this.bookData.binding.value,
        pages: this.bookData.pages.value,
        height: this.bookData.height.value,
        width: this.bookData.width.value,
        thickness: this.bookData.thickness.value,
        notes: this.bookData.notes.value,
      };

      this.$store.addBook(book);
    },
  },
};
</script>

<style scoped lang="scss">
// Start custom common variables
@import '@nativescript/theme/scss/variables/blue';
// End custom common variables

// Custom styles
.books-page .scanner {
  margin: 20 10;
}

.books-page .submit {
  margin: 35 10;
}
</style>
