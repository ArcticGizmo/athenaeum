<template>
  <ScrollView class="confirm-modal">
    <StackLayout class="content">
      <Label class="message" :text="message" :textWrap="true" />
      <Label class="message" text="" />
      <GridLayout width="100%" columns="* *">
        <Button class="button" col="0" :text="confirmName" @tap="onConfirm()" />
        <Button class="button" col="1" :text="rejectName" @tap="onReject()" />
      </GridLayout>
    </StackLayout>
  </ScrollView>
</template>

<script>
export default {
  name: 'ConfirmModal',
  props: {
    message: { type: String, default: '' },
    confirmName: { type: String, default: 'yes' },
    rejectName: { type: String, default: 'no' },
  },
  methods: {
    close(resp) {
      this.$emit('close', resp);
    },
    onConfirm() {
      this.close(this.confirmName);
    },
    onReject() {
      this.close(this.rejectName);
    },
  },
};
</script>

<style>
.confirm-modal {
  width: 80%;
}

.confirm-modal .content {
  padding: 25 50;
}

.confirm-modal .message {
  font-size: 22;
}

.confirm-modal .button {
  font-size: 22;
}
</style>
