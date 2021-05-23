<template>
  <TextField
    class="number-field"
    :text="value"
    keyboardType="integer"
    :maxLength="max"
    @blur="up('blur')"
    @textChange="up('input', $event.value)"
    @returnPress="up('return')"
  />
</template>

<script>
export default {
  name: 'StringField',
  props: {
    value: { type: [Number, String] },
    max: { type: Number, default: Infinity },
  },
  methods: {
    up(topic, event) {
      this.$emit(topic, event);
    },
  },
};
</script>

<style>
.number-field {
  width: 100%;
}
</style>
