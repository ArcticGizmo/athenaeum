<template>
  <Button
    class="dropdown-field"
    :text="value || placeholder"
    @tap="onOpenModal()"
  />
</template>

<script>
export default {
  name: "DropdownField",
  props: {
    value: undefined,
    title: { type: String, default: "Select" },
    cancelText: { type: String, default: "Cancel" },
    items: { type: Array, default: () => [] },
    placeholder: { type: String, default: "" }
  },
  methods: {
    onOpenModal(event) {
      let opts = {
        title: this.title,
        cancelButtonText: this.cancelText,
        actions: this.items
      };

      action(opts).then(result => {
        if (result === this.cancelText) {
          return;
        }
        this.$emit("input", result);
      });
    }
  }
};
</script>

<style>
.dropdown-field {
  background-color: cyan;
}
</style>
