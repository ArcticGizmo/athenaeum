<template>
  <StackLayout class="field-wrapper">
    <CLabel v-if="label" class="label" :text="label" textAlignment="left" />
    <slot></slot>
  </StackLayout>
</template>

<script>
export default {
  name: 'FieldWrapper',
  props: {
    label: { type: String, default: null },
  },
};
</script>

<style>
.field-wrapper {
  margin: 1.5rem 0;
}
.field-wrapper .label {
  margin-bottom: 0.2rem;
  font-weight: bold;
}
</style>
