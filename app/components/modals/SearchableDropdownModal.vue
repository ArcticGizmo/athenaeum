<template>
  <ScrollView class="searchable-dropdown-modal">
    <StackLayout class="content">
      <!-- searchbox -->
      <Search ref="search" v-model="text" :hint="hint" />

      <ScrollView class="matches">
        <!-- if no matches show add -->
        <StackLayout>
          <CLabel :text="keyboardShowing" />
          <CLabel
            class="option"
            v-for="(option, index) in filteredOptions"
            :key="index"
            :text="option"
          />
        </StackLayout>
      </ScrollView>

      <!-- list of options (x percent of the screen maybe) -->
      <!-- should be scrollable -->

      <!-- select/add based on if it matches -->
    </StackLayout>
  </ScrollView>
</template>

<script>
import Search from '../Search.vue';

export default {
  name: 'SearchableDropdownModal',
  components: {
    Search,
  },
  props: {
    options: { type: Array, default: () => [] },
    allowAdd: { type: Boolean, default: false },
    hint: { type: String, default: 'Search' },
  },
  data: () => {
    return {
      text: '',
    };
  },
  computed: {
    keyboardShowing() {
      return this.$keyboard.isShowing;
    },
    filteredOptions() {
      return this.options;
    },
  },
  mounted() {
    setTimeout(() => {
      this.$refs['search'].focus();
    }, 10);
  },
};
</script>

<style>
.searchable-dropdown-modal {
  width: 80%;
}

.searchable-dropdown-modal .content {
  padding: 10;
}

.searchable-dropdown-modal .option {
  font-size: 20;
}
</style>
