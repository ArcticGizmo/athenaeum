import { Toasty } from "@triniwiz/nativescript-toasty";

export class Toaster {
  info(text, opts) {
    return new Toasty({ text, backgroundColor: 'gray', ...(opts || {}) });
  }

  error(text, opts) {
    return new Toasty({ text, backgroundColor: "red", ...(opts || {}) });
  }
}
