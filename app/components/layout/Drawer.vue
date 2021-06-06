<template>
  <GridLayout v-show="show" class="drawer" columns="250 *">
    <ScrollView>
      <transition name="slide-in-left">
        <StackLayout v-show="show" col="0" class="left">
          <!-- info/header section -->
          <GridLayout class="info" columns="2* 3*" rows="* * * *" height="100">
            <Icon class="book-icon" icon="book-reader" row="0" rowSpan="4" col="0" />
            <CLabel row="0" col="1" text="Read: --" textAlignment="left" />
            <CLabel row="1" col="1" text="Owned: --" textAlignment="left" />
            <CLabel row="2" col="1" text="Whishlist: --" textAlignment="left" />
            <CLabel row="3" col="1" text="Lent: -- " textAlignment="left" />
          </GridLayout>

          <!-- all given books -->
          <template v-for="(page, index) in pages">
            <StackLayout class="separator" v-if="page === 'gap'" :key="index" />
            <GridLayout v-else class="item" columns="30 *" :key="index" @tap="onClose(page)">
              <Icon col="0" :icon="page.icon || 'home'" />
              <CLabel col="1" :text="page.name" textAlignment="left" />
            </GridLayout>
          </template>
        </StackLayout>
      </transition>
    </ScrollView>

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
    onClose(resp) {
      this.$emit('close', resp);
    },
  },
};
</script>

<style>
.drawer {
  z-index: 100;
  background-color: #666666bb;
}

.drawer .left {
  background-color: white;
}

.drawer .info {
  background-color: #f2f2f2;
  padding: 15 0;
}

.drawer .book-icon {
  font-size: 40;
}

.drawer .separator {
  height: 1;
  margin: 5 20;
  border-top-width: 1;
  border-top-color: #f2f2f2;
}

.drawer .item {
  height: 50;
  padding: 0 20;
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
