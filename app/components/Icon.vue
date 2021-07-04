<template>
  <CLabel class="nt-icon fas" :text="iconCode" @tap="emit('tap', $event)" />
</template>

<script>
const ICONS = decodeMap({
  home: 0xf015,
  newspaper: 0xf1ea,
  search: 0xf002,
  star: 0xf005,
  cog: 0xf013,
  code: 0xf121,
  barcode: 0xf02a,
  book: 0xf02d,
  'book-open': 0xf518,
  'book-reader': 0xf5da,
  bookmark: 0xf02e,
  bars: 0xf0c9,
  filter: 0xf0b0,
  check: 0xf00c,
  'cardboard-box': 0xf187,
  bookmark: 0xf02e,
  brush: 0xf55d,
  heart: 0xf004,
  stop: 0xf45c,
  tasks: 0xf0ae,
  cross: 0xf00d,
  'address-book': 0xf2b9,
  bell: 0xf0f3,
  'bell-slash': 0xf1f6,
  layers: 0xf5fd,
  calendar: 0xf133,
  camera: 0xf030,
  chart: 0xf201,
  clock: 0xf017,
  'ellipses-h': 0xf141,
  info: 0xf05a,
  pause: 0xf04c,
  play: 0xf04b,
  'sliders-h': 0xf1de,
  sort: 0xf15d,
  star: 0xf005,
  'hand-heart': 0xf4be,
});

function decodeMap(icons) {
  Object.entries(icons).map(([key, value]) => (icons[key] = String.fromCharCode(value)));
  return icons;
}

function decode(value) {
  return value ? String.fromCharCode(value) : null;
}

export default {
  name: 'Icon',
  props: {
    icon: { type: String, default: null },
    code: { type: Number, default: null },
  },
  computed: {
    iconCode() {
      return decode(this.code) || ICONS[this.icon];
    },
  },
  methods: {
    emit(topic, payload) {
      this.$emit(topic, payload);
    },
  },
};
</script>
