import Vue from "nativescript-vue";
import RadSideDrawer from "nativescript-ui-sidedrawer/vue";

Vue.registerElement(
  "BarcodeScanner",
  () => require("nativescript-barcodescanner").BarcodeScannerView
);

Vue.use(RadSideDrawer);

import App from "./components/App";

Vue.config.silent = !__DEV__;

new Vue({
  render: h => h(App)
}).$start();
