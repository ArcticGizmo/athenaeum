<template>
  <StackLayout class="form">
    <Field
      v-for="[key, state, component] in entries"
      :key="key"
      :label="key"
      :canError="state.allowValidation"
      :errors="state.errors"
    >
      <component
        :is="component"
        v-bind="state"
        :value="state.value"
        @return="onBlur(state)"
        @input="validateEntry(state, $event)"
      />
    </Field>
    <!-- <TextView
      :tabindex="0"
      :editable="false"
      :text="dataAsJson"
      height="auto"
    /> -->
  </StackLayout>
</template>

<script>
import Field from "./Field";
import NumberField from "./NumberField";
import StringField from "./StringField";
import DropdownField from "./DropdownField";
import RatingField from "./RatingField";
import ListField from "./ListField";
import MeasurementField from "./MeasurementField";

const TYPES = {
  string: StringField,
  number: NumberField,
  dropdown: DropdownField,
  rating: RatingField,
  list: ListField,
  measure: MeasurementField
};

export default {
  name: "Form",
  components: {
    Field,
    NumberField,
    StringField,
    DropdownField,
    ListField,
    MeasurementField
  },
  props: {
    value: { type: Object }
  },
  computed: {
    entries() {
      return Object.entries(this.value)
        .map(([key, state]) => {
          const component = state.component || TYPES[state.type];
          if (!component) {
            return null;
          }
          return [key, state, component];
        })
        .filter(e => e);
    },
    dataAsJson() {
      return JSON.stringify(this.value || {}, null, 4);
    }
  },
  methods: {
    onBlur(state) {
      state.allowValidation = true;
      this.validateEntry(state, state.value);
    },
    validateEntry(state, value) {
      state.value = value;

      if (!state.allowValidation) {
        return;
      }

      const config = { ...state };

      const errors = (state.validators || [])
        .map(val => val(value, config))
        .filter(v => v);

      const isInvalid = errors.some(i => i);

      state.errors = errors;
      state.isInvalid = isInvalid || false;

      this.update();
    },
    validate() {
      
    },
    update(state) {
      const data = this.value || {};
      const invalid = Object.values(data).some(s => s.isInvalid);
      data.invalid = invalid;
      this.$emit("input", { ...data });
    }
  }
};
</script>

<style>
.form {
  margin: 0 20;
}

.form .invalid TextField {
  border-color: red;
}
</style>
