<template>
  <ScrollView class="multi-select-modal">
    <StackLayout>
      <GridLayout
        class="option"
        v-for="(option, index) in localOptions"
        :key="index"
        columns="40 *"
      >
        <Checkbox col="0" class="checkbox" v-model="option.selected" />
        <CLabel
          col="1"
          class="label"
          :text="option.label"
          @tap="option.selected = !option.selected"
        />
      </GridLayout>
      <GridLayout columns="* *">
        <Button col="0" text="Cancel" @tap="onClose()" />
        <Button col="1" text="Ok" @tap="onSubmit()" />
      </GridLayout>
    </StackLayout>
  </ScrollView>
</template>

<script>
import Checkbox from '~/components/Checkbox.vue';
export default {
  name: 'MultiSelectModal',
  components: {
    Checkbox,
  },
  props: {
    selected: { type: Array, default: () => [] },
    options: { type: Array, default: () => [] },
  },
  data: () => {
    return {
      localOptions: [],
    };
  },
  mounted() {
    const selected = this.selected || [];
    this.localOptions = this.options.map(o => {
      return {
        label: o,
        selected: selected.includes(o),
      };
    });
  },
  methods: {
    onClose(resp) {
      this.$emit('close', resp);
    },
    onSubmit() {
      const selected = this.localOptions.filter(o => o.selected).map(o => o.label);
      this.onClose(selected);
    },
  },
};
</script>

<style>
.multi-select-modal {
  padding-top: 40;
  margin: 20;
  width: 300;
}

.multi-select-modal .option {
  margin: 0 30;
}

.multi-select-modal .option .label {
  font-size: 20;
}

.multi-select-modal button {
  min-width: 80;
}
</style>
