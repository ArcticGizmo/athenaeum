<template>
  <StackLayout>
    <CLabel text="Example form using Vuelidate" />
    <Button text="log state" @tap="onLogState()" />
  </StackLayout>
</template>

<script>
import { validationMixin } from 'vuelidate';
import {
  required,
  email,
  minLength,
  maxLength,
  numeric,
  minValue,
  maxValue,
} from 'vuelidate/lib/validators';

const STATE = {
  title: '',
  authors: [],
  isbn: '',
  pages: null,
  dimensions: {
    unitOfMeasure: 'cm',
    width: null,
    height: null,
    thickness: null,
  },
  binding: '',
  rating: null,
  review: '',
};

const VALIDATIONS = {
  title: { required },
  // authors: [],
  isbn: { required, min: minLength(13), max: maxLength(13) },
  pages: { required, numeric, min: minValue(0) },
  dimensions: {
    unitOfMeasure: { required },
    width: { min: minValue(0) },
    height: { min: minValue(0) },
    thickness: { min: minValue(0) },
  },
  binding: {},
  rating: { min: minValue(0), max: maxValue(5) },
  review: {},
};

export default {
  name: 'FormComponent',
  mixins: [validationMixin],
  data() {
    return {
      form: STATE,
    };
  },
  validations: {
    form: VALIDATIONS,
  },
  methods: {
    onLogState() {
      console.dir(this.$v);
    },
  },
};
</script>
