<template>
  <StackLayout class="rating-field">
    <Star
      :value="value"
      :fillColor="fillColor"
      :emptyColor="emptyColor"
      :outlineColor="outlineColor"
      :allowHalfStars="allowHalfStars"
      @input="onChange"
    />
  </StackLayout>
</template>

<script>
import Star from "./Star.vue";
export default {
  name: "RatingField",
  components: {
    Star
  },
  props: {
    value: { type: Number, default: 0 },
    fillColor: { type: String },
    emptyColor: { type: String },
    outlineColor: { type: String },
    allowHalfStars: { type: Boolean, default: false }
  },
  methods: {
    onChange(val) {
      this.$emit("input", val);
    }
  }
};
</script>

<style>
.rating-field {
  border-width: 1;
  border-color: red;
}
</style>
