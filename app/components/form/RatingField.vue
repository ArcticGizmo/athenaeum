<template>
  <StackLayout
    class="rating-field"
    orientation="horizontal"
    horizontalAlignment="center"
    @loaded="onLoaded"
  >
    <template v-if="show">
      <Star
        v-for="index in stars"
        :key="index"
        :value="getStarValue(index)"
        :fillColor="fillColor"
        :emptyColor="emptyColor"
        :outlineColor="outlineColor"
        :size="size"
        :allowHalves="allowHalves"
        @input="onChange(index, $event)"
      />
    </template>
  </StackLayout>
</template>

<script>
import Star from './Star.vue';
export default {
  name: 'RatingField',
  components: {
    Star,
  },
  props: {
    value: { type: Number, default: 0 },
    stars: { type: Number, default: 5 },
    fillColor: { type: String },
    emptyColor: { type: String },
    outlineColor: { type: String },
    maxHeight: { type: Number, default: 75 },
    allowHalves: { type: Boolean, default: false },
  },
  data: () => {
    return {
      show: false,
      size: 50,
    };
  },
  methods: {
    onLoaded(event) {
      setTimeout(() => {
        this.show = true;
        const { width, height } = event.object.getActualSize();

        let starSize = Math.trunc(width / this.stars);

        if (starSize === 0) {
          return;
        }

        if (starSize > height) {
          starSize = height;
        }

        this.size = starSize > this.maxHeight ? this.maxHeight : starSize;
      });
    },
    getStarValue(index) {
      if (!this.value) {
        return 0;
      }

      const remainingValue = this.value - index + 1;

      return remainingValue > 1 ? 1 : remainingValue;
    },
    onChange(index, startValue) {
      const totalVal = index - 1 + startValue;
      this.$emit('input', totalVal);
    },
  },
};
</script>

<style>
.rating-field {
  /* margin: 20 0; */
  width: 90%;
}
</style>
