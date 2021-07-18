import { helpers } from 'vuelidate/lib/validators';

function withType(type, func) {
  return helpers.withParams({ type }, func);
}

function isNumeric(str) {
  return !isNaN(Number(str));
}

function validateIf(condition, func) {
  return v => (condition(v) ? func(v) : () => helpers.req());
}

export const exactLength = param => {
  return helpers.withParams(
    { type: 'exactLength', length: param },
    value => (value || '').length === param,
  );
};

export const positive = withType(
  'positive',
  validateIf(
    value => isNumeric(value),
    value => Number(value) > 0,
  ),
);

export const numbersOnly = helpers.regex('numbersOnly', /^[0-9]*$/g);
