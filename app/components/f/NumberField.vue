<template>
  <TextField
    class="number-field"
    :class="{ error: v.$error }"
    :text="pendingText"
    :maxLength="maxLength"
    keyboardType="integer"
    returnKeyType="done"
    @textChange="onChange"
    @blur="onEmit()"
    @returnPress="onEmit()"
  />
</template>

<script>
export default {
  name: 'InputField',
  props: {
    value: { type: [String, Number], default: '' },
    v: { type: Object, default: () => ({}) },
    maxLength: { type: Number, default: Infinity },
  },
  data: () => {
    return {
      pendingText: '',
    };
  },
  watch: {
    value: {
      immediate: true,
      handler(v) {
        this.pendingText = v;
      },
    },
  },
  methods: {
    onChange(event) {
      this.pendingText = event.value;
    },
    onEmit() {
      const asNumber = Number(this.pendingText);
      this.$emit('input', isNaN(asNumber) ? this.pendingText : asNumber);
    },
  },
};
</script>

<style>
.number-field {
  width: 100%;
}
</style>
