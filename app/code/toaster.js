import { Toasty } from "@triniwiz/nativescript-toasty";

export class Toaster {
  info(text, opts = {}) {
    this.custom(text, { backgroundColor: "gray", ...opts });
  }

  error(text, opts = {}) {
    return this.custom(text, { backgroundColor: "red", ...opts });
  }

  custom(text, opts = {}) {
    const toast = new Toasty({ text, ...opts });

    if (opts.noShow) {
      return toast;
    }

    toast.show();
  }
}
