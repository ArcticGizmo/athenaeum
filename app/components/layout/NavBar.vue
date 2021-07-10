<template>
  <FlexboxLayout class="nav-bar" alignItems="center" justifyContent="space-around">
    <GridLayout class="item" rows="15 *" v-for="page in formattedPages" :key="page.id">
      <Icon
        rowSpan="2"
        :icon="page.icon"
        :class="{ selected: page.selected }"
        @tap="onSetPage(page)"
      />
      <CLabel v-if="page.selected" class="dot" row="0" text="°" />
    </GridLayout>
  </FlexboxLayout>
</template>

<script>
export default {
  name: 'NavBar',
  props: {
    pages: { type: Array, default: () => [] },
    selectedId: { type: [Number, String], default: null },
  },
  computed: {
    formattedPages() {
      return this.pages.map(p => {
        return {
          ...p,
          selected: p.id === this.selectedId,
        };
      });
    },
  },
  methods: {
    onSetPage(page) {
      this.$emit('select', page);
    },
  },
};
</script>

<style>
.nav-bar {
  box-shadow: -1px -1px 5px grey;
}
.nav-bar .item {
  height: 100%;
}

.nav-bar .item .nt-icon {
  font-size: 20;
  color: gray;
}

.nav-bar .item .nt-icon.selected {
  color: black;
}

.nav-bar .item .dot {
  font-size: 10;
  font-weight: bold;
}
</style>
