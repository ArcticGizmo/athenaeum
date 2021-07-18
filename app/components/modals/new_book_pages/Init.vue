<template>
  <Page class="init">
    <ActionBar title="Page 1" class="action-bar" />
    <StackLayout>
      <Button text="Go Back" @tap="onBack()" />
      <Button text="Go Next" @tap="onNext()" />
    </StackLayout>
  </Page>
</template>

<script>
export default {
  name: 'Init',
  props: {
    next: { type: Object, default: null },
  },
  methods: {
    onBack() {
      this.$navigateBack();
    },
    onNext() {
      if (this.next) {
        this.$navigateTo(this.next);
      }
    },
  },
};
</script>

<style>
.init {
  height: 100%;
  background-color: blue;
}
</style>
