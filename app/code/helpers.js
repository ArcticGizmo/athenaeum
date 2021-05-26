export function attributeFromList(items, matchKey, matchValue, retKey) {
  const item = items.find(i => i[matchKey] === matchValue);

  if (retKey === undefined) {
    return item;
  }

  if (Array.isArray(retKey)) {
    if (!item) {
      return Array(retKey.length).fill(undefined);
    }
    return retKey.map(key => item[key]);
  }

  return !item ? item : item[retKey];
}
