<template>
  <StackLayout class="list-field">
    <GridLayout
      v-for="(text, index) in value"
      :key="index"
      columns="* 30"
      @tap="onRemoveItem(index)"
    >
      <TextField
        col="0"
        :value="text"
        :placeholder="placeholder"
        returnKeyType="done"
        @textChange="onTextChange(index, $event)"
      />
      <Label
        v-if="value.length > min"
        col="1"
        :text="String.fromCharCode(crossIcon)"
        class="nt-icon fas"
      />
    </GridLayout>

    <Button
      v-if="value.length < max"
      horizontalAlignment="right"
      :text="`${addText || 'Add'}`"
      @tap="onAddEmpty()"
    />
  </StackLayout>
</template>

<script>
const CROSS_ICON = 0xf00d;

export default {
  name: "ListField",
  props: {
    value: { type: Array, default: () => [] },
    min: { type: Number, default: 0 },
    max: { type: Number, default: Infinity },
    placeholder: { type: String, default: "" },
    addText: { type: String, default: "" },
    hinter: { type: Function, default: () => [] }
  },
  data: () => {
    return {
      crossIcon: CROSS_ICON
    };
  },
  methods: {
    onTextChange(index, event) {
      const newList = this.value.slice();
      newList[index] = event.value;
      this.setValue(newList);
    },
    onAddEmpty() {
      const newList = this.value.slice();
      newList.push("");
      this.setValue(newList);
    },
    onRemoveItem(index) {
      const newList = this.value.slice();
      newList.splice(index, 1);
      this.setValue(newList);
    },
    setValue(value) {
      this.$emit("input", value);
    }
  }
};
</script>

<style>
.list-field TextField {
  font-size: 18;
  width: 100%;
}

.list-field label {
  height: 100%;
  margin-left: 10;
}

.list-field button {
  height: 45;
  width: 80;
  margin: 0;
  padding: 0;
}
</style>
