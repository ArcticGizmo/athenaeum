<template>
  <StackLayout
    v-if="component"
    ref="container"
    class="modal-container"
    width="100%"
    height="100%"
    verticalAlignment="center"
    @touch="onTouch"
  >
    <component
      ref="child"
      class="modal-child"
      :class="extraClasses"
      v-bind="props"
      :is="component"
      @touch.native="onTouch"
      @close="onClose"
    />
  </StackLayout>
</template>

<script>
import { Application, AndroidApplication } from '@nativescript/core';

function getDimensions(view) {
  const { width, height } = view.getActualSize();
  const { x, y } = view.getLocationOnScreen();

  return {
    topLeft: { x, y },
    bottomRight: { x: x + width, y: y + height },
    width,
    height,
  };
}

function isWithinView({ x, y }, view) {
  const { topLeft, bottomRight } = getDimensions(view);
  return x > topLeft.x && x < bottomRight.x && y > topLeft.y && y < bottomRight.y;
}
export default {
  name: 'ModalContainer',
  props: {
    component: { type: Object, required: true },
    disableOuterClose: { type: Boolean, default: false },
    extraClasses: { type: Array, default: () => [] },
    props: { type: Object, default: () => ({}) },
  },
  data: () => {
    return {
      touchStartedInOuter: false,
    };
  },
  mounted() {
    // overide back button
    Application.android.on(AndroidApplication.activityBackPressedEvent, args => {
      args.cancel = true;
      this.onClose();
    });
  },
  methods: {
    onTouch(event) {
      if (this.disableOuterClose || event.action === 'move') {
        return;
      }

      const child = this.$refs.child.nativeView;
      const container = this.$refs.container.nativeView;

      // if the click involves the child, ignore
      if (!child || event.view === child) {
        this.touchStartedInOuter = false;
        return;
      }

      const point = { x: event.getX(), y: event.getY() };

      if (event.action === 'down') {
        if (event.view === container && !isWithinView(point, child)) {
          this.touchStartedInOuter = true;
        }
        return;
      }

      if (event.action === 'up') {
        if (this.touchStartedInOuter && !isWithinView(point, child)) {
          this.onClose();
        }
        this.touchStartedInOuter = false;
        return;
      }
    },
    onClose(resp) {
      this.$emit('close', resp);
    },
  },
};
</script>

<style>
.modal-container {
  /* adds darkened outside area */
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-container .modal-child {
  background-color: white;
}
</style>
