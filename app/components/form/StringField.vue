<template>
  <TextField
    class="string-field"
    :text="value"
    :maxLength="max"
    :bind="bindings"
    @blur="up('blur')"
    @textChange="up('input', $event.value)"
    @returnPress="up('return')"
  />
</template>

<script>
export default {
  name: 'StringField',
  props: {
    value: { type: [String, Number] },
    keyboardType: { type: String, default: null },
    max: { type: Number, default: Infinity },
  },
  computed: {
    bindings() {
      if (this.keyboardType) {
        return { keyboardType: this.keyboardType };
      }
      return {};
    },
  },
  methods: {
    up(topic, event) {
      this.$emit(topic, event);
    },
  },
};
</script>

<style>
.string-field {
  width: 100%;
}
</style>
