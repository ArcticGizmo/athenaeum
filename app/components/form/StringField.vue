<template>
  <TextField
    :text="value"
    :maxLength="max"
    @blur="up('blur')"
    @textChange="up('input', $event.value)"
  />
</template>

<script>
export default {
  name: "StringField",
  props: {
    value: { type: [String, Number] },
    max: { type: Number, default: Infinity }
  },
  methods: {
    up(topic, event) {
      this.$emit(topic, event);
    }
  }
};
</script>
