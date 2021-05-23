<template>
  <Page class="page">
    <ActionBar class="action-bar">
      <NavigationButton visibility="hidden" />
      <GridLayout columns="50, *">
        <Label class="action-bar-title" text="Raw" colSpan="2" />

        <Label class="fas" text.decode="&#xf0c9;" @tap="onDrawerButtonTap" />
      </GridLayout>
    </ActionBar>

    <StackLayout class="page__content">
      <TextView
        ref="textarea"
        class="raw-textarea"
        :class="{ invalid: !isValid }"
        v-model="text"
        height="auto"
        editable="true"
        autocapitalizationType="none"
        hint="Input JSON"
        :textWrap="true"
        returnKeyType="send"
        @blur="onInputDone"
        @textChange="isValid = true"
      />
      <Button text="Import" @tap="onImport()" />
    </StackLayout>
  </Page>
</template>

<script>
import * as utils from "@/shared/utils";
import { SelectedPageService } from "@/shared/selected-page-service";

const FA_TAG = 0xf121;

function parseJson(str) {
  try {
    return JSON.parse(str);
  } catch (e) {
    return undefined;
  }
}

export default {
  name: "Raw",
  data: () => {
    return {
      tagIcon: String.fromCharCode(FA_TAG),
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
    closeKeyboard() {
      try {
        this.$refs.textarea.nativeView.dismissSoftInput();
      } catch {}
    },
    onImport() {
      this.closeKeyboard();
      const json = parseJson(this.text);

      if (json === undefined) {
        this.isValid = false;
      } else {
        // save the data somewhere
        this.isValid = true;
      }
    },
    onInputDone(args) {
      console.dir("------------");
    }
  }
};
</script>

<style>
.raw-textarea {
  margin-top: 15px;
  border-color: #dedede;
  border-width: 1;
}
</style>

<style scoped lang="scss">
// Start custom common variables
@import "@nativescript/theme/scss/variables/blue";
// End custom common variables

// Custom styles
</style>
