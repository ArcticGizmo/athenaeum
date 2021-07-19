<template>
  <RadAutoCompleteTextView
    ref="autocomplete"
    :items="dataItems"
    :completionMode="completionMode"
    :suggestMode="suggestMode"
    :displayMode="displayMode"
  />
</template>

<script>
import {
  AutoCompleteCompletionMode,
  AutoCompleteDisplayMode,
  AutoCompleteSuggestMode,
  TokenModel,
} from 'nativescript-ui-autocomplete';
import { ObservableArray } from '@nativescript/core';

// <RadAutoCompleteTextView ref="autocomplete"
//                              :completionMode="completionMode"
//                              :suggestMode="suggestMode"
//                              :displayMode="displayMode"
//                              :items="dataItems">

function toDataList(arr) {
  const oArr = new ObservableArray();
  arr.forEach(e => oArr.push(new TokenModel(e, null)));

  return oArr;
}

export default {
  name: 'AutoCompleteField',
  props: {
    value: { type: [String] },
    v: { type: Object, required: true },
  },
  data: () => {
    return {
      dataItems: toDataList(['Australia', 'Belgum']),
      displayMode: AutoCompleteDisplayMode.Tokens,
      suggestMode: AutoCompleteSuggestMode.Suggest,
      completionMode: AutoCompleteCompletionMode.StartsWith,
    };
  },
};
</script>
