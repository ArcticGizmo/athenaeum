import { attributeFromList } from "@/code/helpers";

export function toBook(id, raw, units) {
  return {
    id,
    title: raw.title,
    authors: (raw.authors || []).filter(a => a),
    isbn: raw.isbn,
    blurb: raw.blurb,
    rating: raw.rating,
    binding: raw.binding,
    pages: raw.pages,
    dimensions: {
      height: parseDimension(raw.height, units),
      width: parseDimension(raw.width, units),
      thickness: parseDimension(raw.thickness, units)
    },
    notes: raw.notes
  };
}

function parseDimension(raw, units) {
  const dim = raw || {};

  const unitScale =
    attributeFromList(units, "label", raw.unit, "scaleToMM") || 1;
  const value = dim.measure || 0;
  return {
    displayUnit: dim.unit,
    displayValue: value,
    value: value * unitScale
  };
}

export function toBinding(id, raw, units) {
  return {
    id,
    name: raw.name,
    width: parseDimension(raw.width, units),
    height: parseDimension(raw.height, units),
    coverThickness: parseDimension(raw.coverThickness, units)
  };
}
