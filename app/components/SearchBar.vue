<template>
  <GridLayout class="search-bar" columns="30 * 30">
    <!-- search icon -->
    <Icon icon="search" />
    <TextField
      ref="search"
      col="1"
      colSpan="2"
      :text="value"
      returnKeyType="done"
      :hint="hint"
      @textChange="onTextChange"
      @returnPress="propagate('returnPress', $event)"
      @blur="propagate('blur', $event)"
      @focus="propagate('focus', $event)"
    />
    <CLabel v-if="value" class="cross" col="2" text="x" @tap="onClear()" />
  </GridLayout>
</template>

<script>
export default {
  name: 'SearchBar',
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
    onClear() {
      this.$emit('clear');
      this.$emit('input', '');
    },
  },
};
</script>

<style>
.search-bar {
  margin: 10;
  height: 50;
  background-color: #f6f6f6;
  border-radius: 50%;
}

.search-bar .nt-icon {
  margin-left: 10;
  font-size: 20;
}

.search-bar TextField {
  margin-right: 5;
  border-width: 0;
}

.search-bar .cross {
  font-size: 20;
  margin-right: 10;
}
</style>
