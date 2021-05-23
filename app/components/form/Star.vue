<template>
  <GridLayout
    class="star"
    :width="size"
    :height="size"
    rows="* *"
    columns="3* 2*"
  >
    <Label
      class="symbol"
      :style="symbolStyle"
      :borderColor="outlineColor"
      :borderWidth="borderWidth"
      rows="0"
      col="0"
      rowSpan="2"
      colSpan="2"
    />
    <Label row="0" col="0" rowSpan="2" @touch="onTouch($event, onLeftClick)" />
    <Label row="0" col="1" rowSpan="2" @touch="onTouch($event, onRightClick)" />
  </GridLayout>
</template>

<script>
function eventIsWithin(event) {
  const { height, width } = event.object.getActualSize();

  const x = event.getX();
  const y = event.getY();

  return x > 0 && x < width && y > 0 && y < height;
}

export default {
  name: "Star",
  props: {
    value: { type: Number, default: 0 },
    size: { type: Number, default: 75 },
    fillColor: { type: String, default: "gold" },
    emptyColor: { type: String, default: "transparent" },
    outlineColor: { type: String, default: "black" },
    borderWidth: { type: Number, default: 2 },
    allowHalfStars: { type: Boolean, default: false }
  },
  computed: {
    percentFilled() {
      const val = this.value;
      if (!val || val < 0) {
        return "0%";
      }

      if (val > 1) {
        return "100%";
      }

      return `${val * 100}%`;
    },
    symbolStyle() {
      return {
        background: `linear-gradient(90deg, ${this.fillColor} ${this.percentFilled}, ${this.emptyColor} ${this.percentFilled})`
      };
    }
  },
  methods: {
    setVal(val) {
      this.$emit("input", val);
    },
    onTouch(event, callback) {
      if (event.action === "up" && eventIsWithin(event)) {
        callback();
      }
    },
    onLeftClick() {
      this.setVal(this.allowHalfStars ? 0.5 : 1);
    },
    onRightClick() {
      this.setVal(1);
    }
  }
};
</script>

<style>
.star .symbol {
  clip-path: polygon(
    50% 0%,
    61% 35%,
    100% 35%,
    68% 57%,
    79% 91%,
    50% 70%,
    21% 91%,
    32% 57%,
    0% 35%,
    39% 35%
  );
}
</style>
