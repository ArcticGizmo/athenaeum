<template>
  <Page class="page books-page">
    <ActionBar class="action-bar">
      <NavigationButton visibility="hidden" />
      <GridLayout columns="50, *">
        <Label class="action-bar-title" text="Books" colSpan="2" />

        <Label class="fas" text.decode="&#xf0c9;" @tap="onDrawerButtonTap" />
      </GridLayout>
    </ActionBar>

    <!-- need to make a add new vs update collection option -->
    <ScrollView orientation="vertical">
      <StackLayout>
        <Button class="scanner" text="Scan" @tap="onScan()" />
        <Form v-model="bookData" />
        <Button class="submit" text="Create" @tap="onSubmit()" />
      </StackLayout>
    </ScrollView>
  </Page>
</template>

<script>
import * as utils from "@/shared/utils";
import { SelectedPageService } from "@/shared/selected-page-service";
import Form from "../form/Form.vue";
import { validator } from "../form/form.js";
import { getByISBN } from "@/code/google.js";
import { scan } from "@/code/scanner.js";

function parseJson(str) {
  try {
    return JSON.parse(str);
  } catch (e) {
    return undefined;
  }
}

const UNITS = ["cm", "mm", "inch"];

export default {
  name: "Books",
  components: {
    Form
  },
  data: () => {
    return {
      bookData: {
        title: {
          type: "string",
          value: null,
          max: 255,
          validators: [validator("required")]
        },
        authors: {
          type: "array",
          value: [""],
          min: 1
        },
        isbn: {
          type: "number",
          value: null,
          max: 13,
          validators: [
            validator("min-length", 10, "digits"),
            validator("max-length", 13, "digits")
          ]
        },
        blurb: {
          type: "string",
          value: null
        },
        rating: {
          type: "rating",
          value: null,
          stars: 10,
          allowHalves: true
        },
        binding: {
          value: null,
          type: "dropdown"
        },
        pages: {
          type: "number",
          value: null,
          validators: [validator("required")]
        },
        height: {
          type: "measure",
          units: UNITS,
          value: { measure: null, unit: "cm" },
          validators: [validator("required")]
        },
        width: {
          type: "measure",
          unit: UNITS,
          value: { measure: null, unit: "cm" },
          validators: [validator("required")]
        },
        thickness: {
          type: "measure",
          unit: UNITS,
          value: { measure: null, unit: "cm" },
          validators: [validator("required")]
        },
        notes: {
          type: "string",
          value: null
        }
      }
    };
  },
  mounted() {
    SelectedPageService.getInstance().updateSelectedPage(this.name);
  },
  methods: {
    onDrawerButtonTap() {
      utils.showDrawer();
    },
    onScan() {
      scan().then(resp => setTimeout(() => this.handleScan(resp), 1000));
    },
    handleScan(scanResult) {
      const isbn = scanResult.text;

      let opts = {
        title: "ISBN Found!",
        okButtonText: "Fetch",
        cancelButtonText: "Cancel",
        neutralButtonText: "Retry"
      };

      confirm(opts).then(resp => {
        if (resp === true) {
          this.fetchBook(isbn);
          return;
        }

        if (resp === undefined) {
          this.onScan();
        }
      });
    },
    fetchBook(isbn) {
      getByISBN(isbn).then(book => {
        this.bookData.title.value = book.title;
        this.bookData.isbn.value = book.isbn;
        if ((book.authors || []).length) {
          this.bookData.authors.value = book.authors;
        }
        this.bookData.blurb.value = book.blurb;
        this.bookData.pages.value = book.pages;
      });
    },
    onSubmit() {
      const isbn = "9781547604319";
      getByISBN(isbn).then(book => console.dir(book));
    }
  }
};
</script>

<style scoped lang="scss">
// Start custom common variables
@import "@nativescript/theme/scss/variables/blue";
// End custom common variables

// Custom styles
.books-page .scanner {
  margin: 20 10;
}

.books-page .submit {
  margin: 35 10;
}
</style>
