<template>
  <Page class="page">
    <ActionBar class="action-bar">
      <NavigationButton visibility="hidden" />
      <GridLayout columns="50, *">
        <Label class="action-bar-title" text="Scanner" colSpan="2" />

        <Label class="fas" text.decode="&#xf0c9;" @tap="onDrawerButtonTap" />
      </GridLayout>
    </ActionBar>
    <StackLayout class="page__content">
      <Button text="Scan" @tap="onScan()" />

      <Label :text="`ISBN: ${isbn}`" />
    </StackLayout>
    <!-- 
    <BarcodeScanner
      height="300"
      width="100%"
      formats="QR_CODE, EAN_13, UPC_A"
      :beepOnScan="true"
      reportDuplicates="true"
      preferFrontCamera="false"
      @scanResult="onScanResult"
    /> -->

    <!-- <GridLayout class="page__content">
      <Label class="page__content-icon fas" text.decode="&#xf005;" />
      <Label class="page__content-placeholder" :text="message" />
    </GridLayout> -->
  </Page>
</template>

<script>
import * as utils from "@/shared/utils";
import { SelectedPageService } from "@/shared/selected-page-service";

import { BarcodeScanner } from "nativescript-barcodescanner";
const BS = new BarcodeScanner();

function scan(success, failure = () => null, close = () => null, opts = {}) {
  BS.scan({
    formats: "EAN_13",
    cancelLabel: "EXIT. Also, try the volume buttons!", // iOS only, default 'Close'
    cancelLabelBackgroundColor: "#333333", // iOS only, default '#000000' (black)
    message: "Use the volume buttons for extra light", // Android only, default is 'Place a barcode inside the viewfinder rectangle to scan it.'
    showFlipCameraButton: true, // default false
    preferFrontCamera: false, // default false
    showTorchButton: true, // default false
    beepOnScan: true, // Play or Suppress beep on scan (default true)
    fullScreen: true, // Currently only used on iOS; with iOS 13 modals are no longer shown fullScreen by default, which may be actually preferred. But to use the old fullScreen appearance, set this to 'true'. Default 'false'.
    torchOn: false, // launch with the flashlight on (default false)
    closeCallback: close, // invoked when the scanner was closed (success or abort)
    resultDisplayDuration: 500, // Android only, default 1500 (ms), set to 0 to disable echoing the scanned text
    // orientation: orientation, // Android only, default undefined (sensor-driven orientation), other options: portrait|landscape
    openSettingsIfPermissionWasPreviouslyDenied: true, // On iOS you can send the user to the settings app if access was previously denied
    presentInRootViewController: true // iOS-only; If you're sure you're not presenting the (non embedded) scanner in a modal, or are experiencing issues with fi. the navigationbar, set this to 'true' and see if it works better for your app (default false).
  }).then(
    result => success(result),
    error => failure(error)
  );
}

export default {
  name: "Scanner",
  data: () => {
    return {
      isbn: ""
    };
  },
  mounted() {
    SelectedPageService.getInstance().updateSelectedPage("Featured");
  },
  methods: {
    onDrawerButtonTap() {
      utils.showDrawer();
    },
    onScan() {
      scan(this.onScanSuccess, this.onScanFail);
    },
    onScanSuccess(resp) {
      console.log(`[Scanner] Scan successful. Got ISBN ${resp.text}`);
      this.lookupBook(resp.text);
    },
    onScanFailure() {
      console.error("[Scanner] Error while trying to scan");
    },
    lookupBook(isbn) {
      this.isbn = isbn;
    }
  }
};
</script>

<style scoped lang="scss">
// Start custom common variables
@import "@nativescript/theme/scss/variables/blue";
// End custom common variables

// Custom styles
</style>
