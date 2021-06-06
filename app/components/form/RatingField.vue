<template>
  <StackLayout
    class="rating-field"
    orientation="horizontal"
    horizontalAlignment="center"
    @loaded="onLoaded"
  >
    <Star
      v-for="(value, index) in formattedStars"
      :key="index"
      :value="value"
      :fillColor="fillColor"
      :emptyColor="emptyColor"
      :outlineColor="outlineColor"
      :hideIfEmpty="hideIfEmpty"
      :size="size"
      :allowHalves="allowHalves"
      @input="onChange(index, $event)"
    />
  </StackLayout>
</template>

<script>
import { repeat } from '~/code/helpers';
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
    hideIfEmpty: { type: Boolean, default: false },
  },
  data: () => {
    return {
      size: 50,
    };
  },
  computed: {
    formattedStars() {
      return repeat(this.stars).map((_, min) => {
        const max = min + 1;

        if (this.value > max) {
          return 1;
        }

        if (this.value > min) {
          return this.value - min;
        }

        return 0;
      });
    },
  },
  methods: {
    onLoaded(event) {
      setTimeout(() => {
        const { width, height } = event.object.getActualSize();

        let starSize = Math.trunc(width / this.stars);

        if (starSize === 0) {
          return;
        }

        if (starSize > height) {
          starSize = Math.trunc(height);
        }

        this.size = starSize > this.maxHeight ? this.maxHeight : starSize;
      });
    },
    onChange(index, starValue) {
      const totalVal = index + starValue;
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
