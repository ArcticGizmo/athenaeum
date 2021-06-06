<template>
  <Label class="c-label" v-bind="$props" @loaded="onLoaded" @tap="emit('tap', $event)" />
</template>

<script>
import { isAndroid } from '@nativescript/core';
const ANDROID_CENTERING = {
  center: 1,
  left: 3,
  right: 5,
};

export default {
  name: 'CLabel',
  props: {
    textAlignment: { type: String, default: 'center' },
    rotation: { type: String, default: null },
  },
  methods: {
    onLoaded(event) {
      if (isAndroid) {
        event.object.nativeView.setGravity(16 | (ANDROID_CENTERING[this.textAlignment] || 0));
      }
    },
    emit(topic, payload) {
      this.$emit(topic, payload);
    },
  },
};
</script>

<style></style>
