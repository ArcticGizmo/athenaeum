<template>
  <GridLayout rows="* * *">
    <CLabel row="0" text="Apples" />
    <MultiForm />
    <CLabel row="2" text="Apples" />
  </GridLayout>
</template>

<script>
import MultiForm from '@/components/form/MultiForm.vue';

export default {
  name: 'NewBookModal',
  components: {
    MultiForm,
  },
  methods: {
    close(resp) {
      this.$emit('close', resp);
    },
  },
};
</script>

<style>
.new-book-modal {
  height: 100%;
}

.new-book-frame {
  background-color: orange;
}

.new-book-modal .content {
  margin: 10;
}
</style>
