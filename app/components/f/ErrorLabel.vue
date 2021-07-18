<template>
  <ListView v-if="v.$error" class="error-label" for="err in errors">
    <v-template>
      <GridLayout columns="30 *">
        <Icon col="0" class="icon" icon="cross" />
        <CLabel col="1" class="text" :text="err" :textWrap="true" textAlignment="left" />
      </GridLayout>
    </v-template>
  </ListView>
</template>

<script>
export default {
  name: 'ErrorLabel',
  props: {
    v: { type: Object, default: () => ({}) },
    errors: { type: Array, default: () => [] },
  },
};
</script>

<style>
.error-label {
  separator-color: transparent;
}

.error-label .icon,
.error-label .text {
  color: #dd0000;
}
</style>
