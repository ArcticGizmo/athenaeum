<template>
  <TextField
    class="input-field"
    :class="{ error: v.$error }"
    :text="pendingText"
    :maxLength="maxLength"
    :bind="bindings"
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
    value: { type: String, default: '' },
    v: { type: Object, default: () => ({}) },
    keyboardType: String,
    maxLength: { type: Number, default: Infinity },
  },
  data: () => {
    return {
      pendingText: '',
    };
  },
  computed: {
    bindings() {
      if (this.keyboardType) {
        return { keyboardType: this.keyboardType };
      }
      return {};
    },
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
      this.$emit('input', this.pendingText);
    },
  },
};
</script>

<style>
.input-field {
  width: 100%;
}
</style>
