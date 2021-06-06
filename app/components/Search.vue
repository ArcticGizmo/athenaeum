<template>
  <GridLayout class="search" columns="* 40">
    <!-- input -->
    <TextField
      colSpan="2"
      :value="value"
      returnKeyType="done"
      :hint="hint"
      @textChange="onTextChange"
    />
    <!-- search icon -->
    <CLabel class="cross" col="1" text="x" />
  </GridLayout>
</template>

<script>
export default {
  name: 'Search',
  props: {
    value: null,
    hint: { type: String, default: 'Search ...' },
  },
  methods: {
    onTextChange(event) {
      this.$emit('input', event.value);
    },
  },
};
</script>

<style>
.search {
  height: 50;
}

.search TextField {
  margin-right: 5;
}

.search .cross {
  font-size: 20;
}
</style>
