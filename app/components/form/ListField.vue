<template>
  <Button
    class="list-field"
    :text="value || placeholder"
    @tap="onOpenModal()"
  />
</template>

<script>
export default {
  name: "ListField",
  props: {
    value: undefined,
    title: { type: String, default: "Select" },
    cancelText: { type: String, default: "Cancel" },
    items: { type: Array, default: () => [] },
    placeholder: { type: String, default: "" }
  },
  methods: {
    onOpenModal(event) {
      let options = {
        title: this.title,
        cancelButtonText: this.cancelText,
        actions: this.items
      };

      action(options).then(result => {
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
.list-field {
  background-color: cyan;
}
</style>
