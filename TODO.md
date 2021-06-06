- consider swiping to allow changing of star ratings
  - (use the touch event and on move recalculate value etc)
- make stars scale to width
  - might need to limit the height so that it doesnt look rediculous
  - maxHeight that limits the max width (so it is not huge)
  - this will potentially change how the calculation above works




How to make better touch buttons
@touch="onTouch"

function onTouch(event) {

const layout = event.object;

      const x = event.getX();
      const y = event.getY();

      const { height, width } = layout.getActualSize();

      if (event.action === "down") {
        this[key] = true;
      }

      if (event.action === "cancel") {
        this[key] = false;
        return;
      }

      if (event.action === "move") {
        if ((x < 0) | (x > width) || y < 0 || y > height) {
          this[key] = false;
          return;
        }
      }

      if (event.action === 'up' && eventIsWithin(event)) {
        callback();
      }

      if (event.action === "up" && this[key]) {
        callback();
        this[key] = false;
        return;
      }
    }
}