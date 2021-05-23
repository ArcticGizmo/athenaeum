<template>
  <GridLayout class="measurement-field" columns="2* *">
    <TextField
      col="0"
      keyboardType="integer"
      :value="value.measure"
      @textChange="onTextChange"
    />

    <Button col="1" :text="value.unit || 'Unit'" @tap="onOpenModal()" />
  </GridLayout>
</template>

<script>
export default {
  name: 'MeasurementField',
  props: {
    value: { type: Object, default: () => ({}) },
    units: { type: Array, default: () => [] },
    cancelText: { type: String, default: 'Cancel' },
  },
  methods: {
    setValue(changes) {
      this.$emit('input', { ...this.value, ...changes });
    },
    onTextChange(event) {
      this.setValue({ measure: event.value });
    },
    onOpenModal() {
      let opts = {
        title: 'Unit',
        cancelButtonText: this.cancelText,
        actions: this.units,
      };

      action(opts).then((result) => {
        if (result === this.cancelText) {
          return;
        }

        this.setValue({ unit: result });
      });
    },
  },
};
</script>

<style>
.measurement-field {
  height: 45;
}

.measurement-field button {
  text-transform: lowercase;
}
</style>
