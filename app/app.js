import Vue from "nativescript-vue";
import RadSideDrawer from "nativescript-ui-sidedrawer/vue";
import App from "./components/App";
import store from "./code/store";
import { Toaster } from "@/code/toaster";

Vue.registerElement(
  "BarcodeScanner",
  () => require("nativescript-barcodescanner").BarcodeScannerView
);

Vue.use(RadSideDrawer);

Vue.prototype.$toaster = new Toaster();

Vue.prototype.$store = store;

Vue.config.silent = !__DEV__;

new Vue({
  render: h => h(App)
}).$start();
