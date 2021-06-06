import Vue from 'nativescript-vue';
import RadSideDrawer from 'nativescript-ui-sidedrawer/vue';
import App from './components/App';
import store from './code/store';
import { Toaster } from '@/code/toaster';
import { ModalBus } from './components/modals/modalBus';
import CLabel from './components/CLabel.vue';
import Icon from './components/Icon.vue';

Vue.registerElement(
  'BarcodeScanner',
  () => require('nativescript-barcodescanner').BarcodeScannerView,
);

Vue.use(RadSideDrawer);
Vue.component('CLabel', CLabel);
Vue.component('Icon', Icon);

Vue.prototype.$toaster = new Toaster();

Vue.prototype.$store = store;

Vue.prototype.$modalBus = new ModalBus();

Vue.config.silent = !__DEV__;

new Vue({
  render: h => h(App),
}).$start();
