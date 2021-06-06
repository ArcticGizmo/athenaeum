<template>
  <ActionBar class="zz-header-action-bar">
    <GridLayout class="zz-header" columns="40 * 40">
      <Icon class="icon" col="0" icon="bars" @tap="onOpen()" />
      <CLabel col="1" class="title" :text="title" @tap="onTitle()" />
    </GridLayout>
  </ActionBar>
</template>

<script>
export default {
  name: 'Header',
  props: {
    title: { type: String, default: 'Page Name' },
    openOnTitle: { type: Boolean, default: false },
  },
  methods: {
    onTitle() {
      if (this.openOnTitle) {
        this.onOpen();
      }
    },
    onOpen() {
      console.dir('--- open')
      this.$emit('open');
    },
  },
};
</script>

<style>
.zz-header .c-label {
  font-size: 18;
}
</style>
