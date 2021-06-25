<template>
  <ScrollView class="text-field-modal">
    <StackLayout class="content">
      <TextField v-model="value" :maxLength="max" :bind="keyboardBinding" returnKeyType="done" />
      <StackLayout orientation="horizontal" horizontalAlignment="right">
        <Button :text="confirmName" @tap="close(value)" />
      </StackLayout>
    </StackLayout>
  </ScrollView>
</template>

<script>
export default {
  name: 'TextFieldModal',
  props: {
    keyboardType: { type: String, default: null },
    max: { type: Number, default: Infinity },
    confirmName: { type: String, default: 'ok' },
  },
  data: () => {
    return {
      value: '',
    };
  },
  computed: {
    keyboardBinding() {
      if (this.keyboardType) {
        return { keyboardType: this.keyboardType };
      }
      return {};
    },
  },
  methods: {
    close(resp) {
      this.$emit('close', resp);
    },
  },
};
</script>

<style>
.text-field-modal {
  width: 80%;
}

.text-field-modal .content {
  padding: 10;
}
</style>
