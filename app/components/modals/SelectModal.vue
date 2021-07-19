<template>
  <ScrollView class="select-modal">
    <StackLayout class="content">
      <CLabel v-if="options.length === 0" text="No options given" />
      <template v-else>
        <CLabel
          v-for="(option, index) in options"
          :key="index"
          :text="option"
          :textWrap="true"
          @tap="close(option)"
        />
      </template>
    </StackLayout>
  </ScrollView>
</template>

<script>
import TextFieldModal from './TextFieldModal.vue';

export default {
  name: 'SelectModal',
  props: {
    options: { type: Array, default: () => [] },
    allowAdd: { type: Boolean, default: false },
  },
  methods: {
    close(resp) {
      this.$emit('close', resp);
    },
    onAdd() {
      this.$modalBus.open(TextFieldModal, { confirmName: 'Add' }).onClose(resp => {
        if (resp) {
          this.close(resp);
        }
      });
    },
  },
};
</script>

<style>
.select-modal {
  width: 80%;
}

.select-modal .content {
  padding: 10;
}

.select-modal .c-label {
  font-size: 24;
  margin-bottom: 10;
}
</style>
