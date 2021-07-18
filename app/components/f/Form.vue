<template>
  <StackLayout class="form">
    <FieldWrapper v-for="elem in elements" :key="elem.key" :label="elem.label">
      <component
        :is="elem.component"
        :value="v[elem.key].$model"
        :v="v[elem.key]"
        v-bind="elem.props"
        @input="onChange(v[elem.key], $event)"
      />
      <ErrorLabel :v="v[elem.key]" :errors="elem.errors" />
    </FieldWrapper>
  </StackLayout>
</template>

<script>
import FieldWrapper from './FieldWrapper.vue';
import ErrorLabel from './ErrorLabel.vue';
import InputField from './InputField.vue';

const COMPONENTS = {
  input: InputField,
};

function getErrors(layout, rootV, v, parser) {
  const paramMap = Object.entries(v.$params).map(([key, params]) => {
    return {
      key,
      type: (params || {}).type,
      params,
    };
  });
  const errors = paramMap.reduce((acc, p) => {
    const msgCallback = parser[p.type] || 'Invalid';
    if (msgCallback && !v[p.key]) {
      if (typeof msgCallback === 'string') {
        acc.push(msgCallback);
      } else {
        acc.push(msgCallback({ params: p.params, v, rootV, layout }));
      }
    }
    return acc;
  }, []);
  return parser.$showAll !== false ? errors : errors.slice(0, 1);
}

export default {
  name: 'Form',
  components: {
    FieldWrapper,
    ErrorLabel,
  },
  props: {
    v: { type: Object, required: true },
    layout: { type: Object, required: true },
    parser: { type: Object, default: () => ({}) },
  },
  computed: {
    elements() {
      return Object.entries(this.layout)
        .map(([key, config]) => {
          const component = config.component || COMPONENTS[config.type];

          const label = config.label;

          const parser = { ...this.parser, ...(config.parser || {}) };

          const errors = getErrors(this.layout, this.v, this.v[key], parser);

          return {
            key,
            label,
            component,
            props: config.props,
            errors,
          };
        })
        .filter(e => e.component);
    },
  },
  methods: {
    onChange(v, value) {
      // this is to get around a mutating prop warning
      v.$model = value;
    },
  },
};
</script>
