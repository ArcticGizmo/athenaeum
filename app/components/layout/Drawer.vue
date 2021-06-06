<template>
  <GridLayout v-show="show" class="drawer" columns="200 *">
    <transition name="slide-in-left">
      <StackLayout v-show="show" col="0" class="left">
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
    </transition>

    <StackLayout col="1" class="right" @tap="onClose()" />
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
.drawer {
  background-color: transparent;
}

.drawer .left {
  background-color: white;
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

.slide-in-left-enter-active {
  animation-name: slide-in-left;
  animation-duration: 0.2s;
  animation-fill-mode: forwards;
  animation-timing-function: linear;
}


@keyframes slide-in-left {
  from {
    transform: translate3d(-100%, 0, 0);
    visibility: visible;
  }

  to {
    transform: translate3d(0, 0, 0);
  }
}
</style>
