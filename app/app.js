import Vue from "nativescript-vue";
import RadSideDrawer from "nativescript-ui-sidedrawer/vue";

import { Toaster } from "@/code/toaster";

Vue.registerElement(
  "BarcodeScanner",
  () => require("nativescript-barcodescanner").BarcodeScannerView
);

Vue.use(RadSideDrawer);

Vue.prototype.$toaster = new Toaster();

import App from "./components/App";

Vue.config.silent = !__DEV__;

new Vue({
  render: h => h(App)
}).$start();
