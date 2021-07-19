<template>
  <GridLayout class="dropdown-field" columns="* 30">
    <Button colSpan="2" :text="value || placeholder" @tap="onOpenModal()" />
    <Icon col="1" icon="chevron-up" />
  </GridLayout>
</template>

<script>
import SelectModal from '@/components/modals/SelectModal.vue';

export default {
  name: 'DropdownField',
  props: {
    value: undefined,
    v: { type: Object, required: true },
    title: { type: String, default: 'Select' },
    cancelText: { type: String, default: 'Cancel' },
    items: { type: Array, default: () => [] },
    placeholder: { type: String, default: '' },
  },
  methods: {
    onOpenModal() {
      const opts = {
        title: this.title,
        options: this.items,
        allowAdd: true,
      };

      this.$modalBus.open(SelectModal, opts).onClose(resp => {
        if (resp !== undefined) {
          this.$emit('input', resp);
        }
      });
    },
  },
};
</script>

<style>
.dropdown-field {
  height: 60;
  width: 100%;
}

.dropdown-field button {
  width: 100%;
}

.dropdown-field label {
  color: white;
  z-index: 10;
  height: 100%;
  width: 100%;
}
</style>
