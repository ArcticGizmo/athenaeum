import { isAndroid, Application } from '@nativescript/core';

import { Frame } from '@nativescript/core/ui';

function trackAndroidKeyboard(callback) {
  if (!Frame.topmost()) {
    setTimeout(() => trackAndroidKeyboard(callback), 100);
    return;
  }
  if (!Frame.topmost().currentPage) {
    setTimeout(() => trackAndroidKeyboard(callback), 100);
    return;
  }

  var cv = Frame.topmost().currentPage.android;

  cv.getViewTreeObserver().addOnGlobalLayoutListener(
    new android.view.ViewTreeObserver.OnGlobalLayoutListener({
      onGlobalLayout: function() {
        // Grab the Current Screen Height
        var rect = new android.graphics.Rect();
        cv.getWindowVisibleDisplayFrame(rect);
        var screenHeight = cv.getRootView().getHeight();
        var missingSize = screenHeight - rect.bottom;

        if (missingSize > screenHeight * 0.15) {
          notifyKeyboard(true, callback);
        } else {
          notifyKeyboard(false, callback);
        }
      },
    }),
  );
}

function trackiOSKeyboard(callback) {
  Application.ios.addNotificationObserver(UIKeyboardDidShowNotification, function() {
    notifyKeyboard(true, callback);
  });
  Appliation.ios.addNotificationObserver(UIKeyboardDidHideNotification, function() {
    notifyKeyboard(false, callback);
  });
}

var lastNotification = false;
function notifyKeyboard(isShown, callback) {
  if (isShown === lastNotification) {
    return;
  }
  lastNotification = isShown;

  callback(isShown);
}

export class Keyboard {
  constructor() {
    this.isShowing = false;
    const callback = isShowing => (this.isShowing = isShowing);

    const tracker = isAndroid ? trackAndroidKeyboard : trackiOSKeyboard;
    tracker(callback);
  }
}
