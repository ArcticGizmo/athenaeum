<template>
  <ScrollView class="carousel-field" orientation="horizontal">
    <StackLayout orientation="horizontal">
      <GridLayout
        class="item"
        v-for="(item, index) in composedOptions"
        :key="index"
        :class="{ highlight: item.id === value }"
        horizontalAlignment="center"
        @tap="onSelect(item.id)"
      >
        <Icon v-if="item.add" icon="plus" />
        <CLabel v-else :text="item.name" :textWrap="true" />
      </GridLayout>
    </StackLayout>
  </ScrollView>
</template>

<script>
function toOption(opt) {
  if (typeof opt === 'string') {
    return { id: opt, name: opt };
  }
  return opt;
}

export default {
  name: 'CarouselField',
  props: {
    value: { type: [String, Number, Boolean] },
    v: { type: Object, required: true },
    items: { type: Array, default: () => [] },
    add: { type: Function, default: null },
  },
  computed: {
    composedOptions() {
      const options = this.items.map(toOption);

      if (this.allowAdd) {
        options.push({ add: this.add });
      }

      return options;
    },
  },
  methods: {
    onSelect(id) {
      if (id === this.value) {
        return;
      }
      this.$emit('input', id);
    },
  },
};
</script>

<style>
.carousel-field .item {
  border-width: 1;
  border-color: gray;
  border-radius: 10;
  height: 60;
  margin: 5;
  padding: 5;
}

.carousel-field .item.highlight {
  background-color: rgba(95, 158, 160, 0.5);
}
</style>
