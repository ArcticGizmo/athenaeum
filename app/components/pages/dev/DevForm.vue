<template>
  <ScrollView class="dev-form">
    <StackLayout>
      <CLabel text="Example form using Vuelidate" />
      <Button text="log state" @tap="onLogState" />

      <Form :v="$v.form" :layout="layout" :parser="errorParser" />
      <Button text="Validate" @tap="onValidate" />
    </StackLayout>
  </ScrollView>
</template>

<script>
import Form from '@/components/f/Form.vue';
import { validationMixin } from 'vuelidate';
import { required, minLength, numeric, minValue, maxValue } from 'vuelidate/lib/validators';
import { exactLength, numbersOnly, positive } from '@/components/f/validators';

const BINDINGS = [
  'B Format',
  'American B Format',
  'Magazine',
  'Hard Cover',
  'English Hard Cover',
  'Leather',
];

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
  secondaryBinding: '',
  tags: '',
  rating: null,
  review: '',
  a: '',
  b: '',
  c: '',
};

const VALIDATIONS = {
  title: { required, min: minLength(5) },
  // authors: [],
  isbn: { required, numbersOnly, exactLength: exactLength(13) },
  pages: { required, numeric, positive },
  dimensions: {
    unitOfMeasure: { required },
    width: { min: minValue(0) },
    height: { min: minValue(0) },
    thickness: { min: minValue(0) },
  },
  binding: { required },
  secondaryBinding: { required },
  tags: { required },
  a: '',
  b: '',
  c: '',
  rating: { min: minValue(0), max: maxValue(5) },
  review: {},
};

const LAYOUT = {
  title: { type: 'input', label: 'Title', props: {} },
  isbn: { type: 'input', label: 'ISBN', props: { keyboardType: 'integer' } },
  binding: {
    type: 'carousel',
    label: 'Binding',
    props: { items: BINDINGS, placeholder: 'Select Binding', add: () => console.dir('--- add') },
  },
  secondaryBinding: {
    type: 'dropdown',
    label: 'Secondary Binding',
    props: { items: BINDINGS, placeholder: 'Select Binding', add: () => console.dir('--- add') },
  },
  tags: {
    type: 'autocomplete',
    label: 'Tags',
  },
  pages: { type: 'numeric', label: 'Pages' },
  a: { type: 'input', label: 'A' },
  b: { type: 'input', label: 'B' },
  c: { type: 'input', label: 'B' },
};

const ERROR_PARSER = {
  required: 'This field is required',
  minLength: data => `Must be ${data.params.min} characters or more`,
  exactLength: data => `Must be exactly ${data.params.length} characters`,
  positive: 'Value must be positive',
  numbersOnly: 'Must only contain numbers',
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

<style>
.dev-form .form {
  margin: 0 20;
}
</style>
