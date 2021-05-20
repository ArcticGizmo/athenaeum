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
      <Form v-model="formData" />
      <!-- <StackLayout class="page__content">
        <Label class="key" text="Title" />
        <TextField  v-model="book.title" />

        <Label class="key" text="Author" />

        <Label class="key" text="ISBN" />
        <TextField keyboardType="integer"  v-model="book.isbn" />

        <Label class="key" text="Blurb" />
        <TextField  v-model="book.blurb" />

        <Label class="key" text="Rating" />

        <Label class="key" text="Binding" />
        <TextField  v-model="book.binding" />

        <Label class="key" text="Pages" />
        <TextField keyboardType="integer"  v-model="book.pages" />

        <Label class="key" text="Form Factor" />
        <TextField  v-model="book.formFactor" />


        <Label class="key" text="Dimensions" />

        <Button text="Create" @tap="onCreate()" />
      </StackLayout> -->
    </ScrollView>
  </Page>
</template>

<script>
import * as utils from "@/shared/utils";
import { SelectedPageService } from "@/shared/selected-page-service";
import Form from "../form/Form.vue";
import { validator } from "../form/form.js";

function parseJson(str) {
  try {
    return JSON.parse(str);
  } catch (e) {
    return undefined;
  }
}

function defaultBookForm() {
  return {
    title: null,
    authors: [""],
    isbn: null,
    blurb: null,
    rating: { min: 0, max: 10, step: 0, value: null },
    binding: "",
    pages: null,
    formFactor: null,
    dimensions: {
      height: { value: null, unit: null },
      width: { value: null, unit: null },
      thickness: { value: null, unit: null }
    },
    notes: null
  };
}

export default {
  name: "Books",
  components: {
    Form
  },
  data: () => {
    return {
      formData: {
        title: {
          type: "string",
          value: "Apples",
          max: 255,
          validators: [
            validator("max-length", 255, "letters"),
            validator("required")
          ]
        },
        // authors: {type: "List", value: []},
        isbn: {
          type: "number",
          value: 12345,
          max: 13,
          validators: [
            validator("min-length", 10, "digits"),
            validator("max-length", 13, "digits")
          ]
        },
        form: {
          type: "list",
          value: "apple",
          items: ["Apple", "Banana", "Cat"]
        }
        // rating: {type: "Rating", value: null, min: 0, max: 10}
      },
      bookForm: defaultBookForm(),
      text: "",
      isValid: true
    };
  },
  mounted() {
    SelectedPageService.getInstance().updateSelectedPage(this.name);
  },
  methods: {
    onDrawerButtonTap() {
      utils.showDrawer();
    },
    onCreate() {}
  }
};
</script>

<style>
.books-page .key {
  font-size: 26;
}
</style>

<style scoped lang="scss">
// Start custom common variables
@import "@nativescript/theme/scss/variables/blue";
// End custom common variables

// Custom styles
</style>
