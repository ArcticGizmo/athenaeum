<template>
  <GridLayout class="search" columns="* 40">
    <!-- input -->
    <TextField
      ref="search"
      colSpan="2"
      :value="value"
      returnKeyType="done"
      :hint="hint"
      @textChange="onTextChange"
      @returnPress="propagate('returnPress', $event)"
      @blur="propagate('blur', $event)"
      @focus="propagate('focus', $event)"
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
    propagate(topic, event) {
      this.$emit(topic, event);
    },
    onTextChange(event) {
      this.$emit('input', event.value);
    },
    focus() {
      this.$refs['search'].nativeView.focus();
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
