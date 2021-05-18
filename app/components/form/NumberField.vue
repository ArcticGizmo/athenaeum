<template>
  <TextField
    :text="value"
    keyboardType="integer"
    @blur="up('blur')"
    @textChange="up('input', $event.value)"
  />
</template>

<script>
export default {
  name: "StringField",
  props: {
    value: { type: [Number, String] }
  },
  methods: {
    up(topic, event) {
      this.$emit(topic, event);
    }
  }
};
</script>
