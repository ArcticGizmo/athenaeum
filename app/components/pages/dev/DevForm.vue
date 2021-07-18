<template>
  <StackLayout>
    <CLabel text="Example form using Vuelidate" />
    <Button text="log state" @tap="onLogState" />

    <Form :v="$v.form" :layout="layout" :parser="errorParser" />
    <Button text="Validate" @tap="onValidate" />
  </StackLayout>
</template>

<script>
import Form from '@/components/f/Form.vue';
import { validationMixin } from 'vuelidate';
import {
  required,
  minLength,
  maxLength,
  numeric,
  minValue,
  maxValue,
} from 'vuelidate/lib/validators';
import { exactLength, numbersOnly } from '@/components/f/validators';

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
  title: { required, min: minLength(5) },
  // authors: [],
  isbn: { required, numbersOnly, exactLength: exactLength(13) },
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

const LAYOUT = {
  title: { type: 'input', label: 'Title', props: {} },
  isbn: { type: 'input', label: 'ISBN', props: {} },
};

const ERROR_PARSER = {
  required: 'This field is required',
  minLength: data => `Must be ${data.params.min} characters or more`,
  exactLength: data => `Must be exactly ${data.params.length} characters`,
  positive: 'Value must be positive',
};

export default {
  name: 'FormComponent',
  mixins: [validationMixin],
  components: {
    Form,
  },
  data() {
    return {
      form: STATE,
      layout: LAYOUT,
      errorParser: ERROR_PARSER,
    };
  },
  validations: {
    form: VALIDATIONS,
  },
  methods: {
    onLogState() {
      console.dir(this.$v);
    },
    onValidate() {
      // this.$v.$touch();
      // console.dir($v.errors);
      // console.dir($v.$errors);
    },
  },
};
</script>
