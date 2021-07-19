<template>
  <GridLayout class="dropdown-field" columns="* 30">
    <Button colSpan="2" :text="value || placeholder" @tap="onOpenModal()" />
    <Label col="1" :text="String.fromCharCode(chevronUp)" class="nt-icon fas" />
  </GridLayout>
</template>

<script>
import SelectModal from '../modals/SelectModal.vue';
const CHEVRON_UP = 0xf077;

export default {
  name: 'DropdownField',
  props: {
    value: undefined,
    title: { type: String, default: 'Select' },
    cancelText: { type: String, default: 'Cancel' },
    items: { type: Array, default: () => [] },
    placeholder: { type: String, default: '' },
  },
  data: () => {
    return {
      chevronUp: CHEVRON_UP,
    };
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
