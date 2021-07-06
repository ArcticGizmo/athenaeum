<template>
  <StackLayout class="lv">
    <CLabel class="label" :text="label" horizontalAlignment="left" />
    <Label class="value" :text="text" :wrapText="multiline" horizontalAlignment="left" />
  </StackLayout>
</template>

<script>
export default {
  name: 'LV',
  props: {
    label: { type: String, default: '' },
    text: { type: String, default: '' },
    multiline: { type: Boolean, default: false },
  },
};
</script>

<style>
.lv {
  margin: 6;
}

.lv .label {
  font-size: 18;
  font-weight: 500;
  padding-bottom: 5;
}

.lv .value {
  font-size: 15;
  background-color: #f6f6f6;
  border-radius: 20;
  width: 100%;
  padding: 15;
}

.lv .label,
.lv .value {
  padding-left: 15;
}
</style>
