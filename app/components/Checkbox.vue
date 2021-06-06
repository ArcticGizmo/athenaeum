<template>
  <Icon class="checkbox" :icon="value ? 'check' : null" @tap="$emit('input', !value)" />
</template>

<script>
export default {
  name: 'Checkbox',
  props: {
    value: { type: Boolean, default: false },
  },
};
</script>

<style>
.checkbox {
  border-width: 1;
  border-color: black;
  height: 30;
  width: 30;
  margin: 10;
  font-size: 18;
}
</style>
