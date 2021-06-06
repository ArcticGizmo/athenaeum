<template>
  <GridLayout v-show="show" class="drawer" columns="200 *">
    <StackLayout col="0" class="left">
      <GridLayout columns="* *" rows="* * * *" height="100">
        <Icon class="book-icon" icon="book" row="0" rowSpan="4" col="0" />
        <CLabel row="0" col="1" text="Read: --" textAlignment="left" />
        <CLabel row="1" col="1" text="Owned: --" textAlignment="left" />
        <CLabel row="2" col="1" text="Whishlist: --" textAlignment="left" />
        <CLabel row="3" col="1" text="Lent: -- " textAlignment="left" />
      </GridLayout>

      <StackLayout class="separator" />

      <CLabel text="apple" />

      <!-- all given books -->
      <ScrollView> </ScrollView>
    </StackLayout>
    <StackLayout col="1" class="right" @tap="onClose()">
      <!-- a summary of your librarb -->
      <!-- total books -->
      <!-- read hours -->
      <!-- whishlist -->

      <!-- all drawers -->
    </StackLayout>
  </GridLayout>
</template>

<script>
export default {
  name: 'Drawer',
  props: {
    show: { type: Boolean, default: false },
    pages: { type: Array, default: () => [] },
  },
  methods: {
    onTap() {
      console.dir('---- tap');
    },
    onClose(resp) {
      this.$emit('close', resp);
    },
  },
};
</script>

<style>
.drawer .left {
  background-color: white;
}

.drawer .right {
  background-color: rgba(0, 0, 0, 0.05);
}

.drawer .book-icon {
  font-size: 40;
}

.drawer .separator {
  padding-top: 15;
  height: 10;
  margin: 0 20;
  border-top-width: 1;
  border-top-color: black;
}
</style>
