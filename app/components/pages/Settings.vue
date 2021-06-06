<template>
  <GridLayout class="settings-page">
    <Button text="Destroy Library" @tap="onDestoryLibrary()" />
  </GridLayout>
</template>

<script>
export default {
  name: 'SettingsPage',
  methods: {
    onDestoryLibrary() {
      this.$store.deleteAll();
      this.$toaster.info('Library was burnt down !');
    },
  },
};
</script>

<style></style>
