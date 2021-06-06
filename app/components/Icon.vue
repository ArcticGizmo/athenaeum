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
  'open-book': 0xf518,
  'book-reader': 0xf5da,
  bookmark: 0xf02e,
  bars: 0xf0c9,
  filter: 0xf0b0,
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
