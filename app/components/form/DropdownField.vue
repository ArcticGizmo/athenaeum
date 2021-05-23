<template>
  <GridLayout class="dropdown-field" columns="* 30">
    <Button colSpan="2" :text="value || placeholder" @tap="onOpenModal()" />
    <Label col="1" :text="String.fromCharCode(chevronUp)" class="nt-icon fas" />
  </GridLayout>
</template>

<script>
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
    onOpenModal(event) {
      let opts = {
        title: this.title,
        cancelButtonText: this.cancelText,
        actions: this.items,
      };

      action(opts).then((result) => {
        if (result === this.cancelText) {
          return;
        }
        this.$emit('input', result);
      });
    },
  },
};
</script>

<style>
.dropdown-field {
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
