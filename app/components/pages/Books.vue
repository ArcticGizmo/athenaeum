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
      thickness: { value: null, unit: null },
    },
    notes: null,
  };
}

export default {
  name: "Books",
  components: {
    Form,
  },
  data: () => {
    return {
      bookData: {
        title: {
          type: "string",
          value: null,
          max: 255,
          validators: [validator("required")],
        },
        authors: {
          type: "array",
          value: [null],
          min: 1,
        },
        isbn: {
          type: "number",
          value: null,
          max: 13,
          validators: [
            validator("min-length", 10, "digits"),
            validator("max-length", 13, "digits"),
          ],
        },
        blurb: {
          type: "string",
          value: null,
        },
        rating: {
          type: "rating",
          value: null,
          stars: 10,
          allowHalves: true,
        },
        binding: {
          value: null,
          type: "dropdown",
        },
        pages: {
          type: "number",
          value: null,
          validators: [validator("required")],
        },
        height: {
          type: "measure",
          value: { measure: null, unit: "cm" },
          validators: [validator("required")],
        },
        width: {
          type: "measure",
          value: { measure: null, unit: "cm" },
          validators: [validator("required")],
        },
        thickness: {
          type: "measure",
          value: { measure: null, unit: "cm" },
          validators: [validator("required")],
        },
        notes: {
          type: "string",
          value: null,
        },
      },
      formData: {
        title: {
          type: "string",
          value: "Apples",
          max: 255,
          validators: [
            validator("max-length", 255, "letters"),
            validator("required"),
          ],
        },
        authors: {
          type: "list",
          value: [""],
          min: 1,
          valiators: [validator("required")],
        },
        isbn: {
          type: "number",
          value: 12345,
          max: 13,
          validators: [
            validator("min-length", 10, "digits"),
            validator("max-length", 13, "digits"),
          ],
        },
        "form factor": {
          type: "dropdown",
          value: "apple",
          items: ["Apple", "Banana", "Cat"],
        },
        rating: {
          type: "rating",
          value: null,
          stars: 5,
          maxHeight: 50,
          allowHalves: true,
          fillColor: "gold",
          outlineColor: "black",
        },
        width: {
          type: "measure",
          value: { unit: "cm" },
          units: ["cm", "mm", "inch"],
          validators: [validator("required"), validator("positive")],
        },
        height: {
          type: "measure",
          value: { unit: "cm" },
          units: ["cm", "mm", "inch"],
        },
      },
      bookForm: defaultBookForm(),
      text: "",
      isValid: true,
    };
  },
  mounted() {
    SelectedPageService.getInstance().updateSelectedPage(this.name);
  },
  methods: {
    onDrawerButtonTap() {
      utils.showDrawer();
    },
    onCreate() {},
  },
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
