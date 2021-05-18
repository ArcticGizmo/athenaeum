import { isNumber } from "@nativescript/core/utils/types";

const VALIDATORS = {
  "min-length": (min, kind) => value => {
    const length = `${value}`.length;
    return result(length < min, `Must be greater than ${min} ${kind}`);
  },
  "max-length": (max, kind) => value => {
    const length = `${value}`.length;
    return result(length > max, `Must be less than ${max} ${kind}`);
  },
  required: () => value => result(value == null || value === "", "Required"),
  "is-number": () => value => result(!isNumber(value), "Must be a number")
};

function result(bool, value) {
  return bool ? value : null;
}

export function validator(type, ...config) {
  const validator = VALIDATORS[type];

  if (!validator) {
    return () => false;
  }

  return validator(...config);
}
