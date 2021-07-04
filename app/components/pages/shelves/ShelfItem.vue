<template>
  <GridLayout class="shelf-item" columns="100 *">
    <!-- book side -->
    <GridLayout rows="* * 20" columns="22 *">
      <!-- book colors -->
      <StackLayout rowSpan="4" verticalAlignment="center">
        <GridLayout
          class="color-swatch"
          v-for="(color, index) in colors.filter(c => c)"
          :key="index"
          :backgroundColor="color"
        />
      </StackLayout>

      <!-- book image -->
      <Image rowSpan="4" col="1" :src="src" />

      <!-- status -->
      <CLabel col="1" text="S" horizontalAlignment="left" />

      <!-- rating -->
      <CLabel row="2" text="* * * * *" />
    </GridLayout>

    <StackLayout col="1" rowSpan="4" verticalAlignment="center">
      <CLabel v-if="title" class="title" :text="title" />
      <CLabel v-if="authorsNames" class="authors" :text="authorsNames" />
      <CLabel v-if="series" class="series" :text="series" />
    </StackLayout>
    <!-- text side -->
  </GridLayout>
</template>

<script>
export default {
  name: 'ShelfItem',
  props: {
    src: { type: String },
    title: { type: String },
    series: { type: String },
    authors: { type: [String, Array], default: '' },
    colors: { type: Array, default: () => [] },
  },
  computed: {
    authorsNames() {
      if (typeof this.authors === 'string') {
        return this.authors;
      }

      return this.authors.join(', ');
    },
  },
};
</script>

<style>
.shelf-item {
  border-radius: 25;
  background-color: #f6f6f6;
  height: 160;
}

.shelf-item .color-swatch {
  height: 20%;
}

.shelf-item .title {
  font-size: 20;
}

.shelf-item .authors {
  font-size: 16;
}

.shelf-item .series {
  font-size: 12;
}
</style>
