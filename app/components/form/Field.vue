<template>
  <StackLayout class="field" :class="{ invalid: invalid }">
    <Label class="label" :text="label" />
    <slot></slot>
    <template v-if="canError">
      <Label
        class="validation-error"
        v-for="(error, index) in errors"
        :key="index"
        :text="`* ${error}`"
      />
    </template>
  </StackLayout>
</template>

<script>
export default {
  name: "Field",
  props: {
    label: { type: String, default: "" },
    canError: { type: Boolean, default: false },
    errors: { type: Array, default: () => [] }
  },
  computed: {
    invalid() {
      return this.canError && this.errors.length;
    }
  }
};
</script>

<style>
.field > .label {
  font-size: 26;
  color: orange;
}

.field > .validation-error {
  color: red;
  margin-left: 20;
}
</style>
