<template>
  <StackLayout class="field" :class="{ invalid: invalid }">
    <Label :text="label" />
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
.field {
  margin-top: 20;
}

.field > label {
  font-size: 22;
  color: black;
  text-transform: capitalize;
  font-weight: bold;
}

.field > .validation-error {
  color: red;
  margin-left: 20;
  font-size: 16;
}
</style>
