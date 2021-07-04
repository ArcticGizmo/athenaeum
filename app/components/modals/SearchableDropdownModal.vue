<template>
  <ScrollView class="searchable-dropdown-modal">
    <StackLayout class="content">
      <!-- searchbox -->
      <SearchBar ref="search" v-model="text" :hint="hint" />
      <!-- add a notification for adding a new one -->

      <ScrollView class="options">
        <!-- might want to make this a limited height -->

        <!-- if no matches show add -->
        <StackLayout>
          <CLabel
            class="option"
            v-for="(option, index) in filteredOptions"
            :key="index"
            :text="option"
          />
        </StackLayout>
      </ScrollView>
    </StackLayout>
  </ScrollView>
</template>

<script>
import SearchBar from '../SearchBar.vue';

export default {
  name: 'SearchableDropdownModal',
  components: {
    SearchBar,
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
    filteredOptions() {
      // fuzzysort this
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

.searchable-dropdown-modal .options {
  max-height: 80;
}

.searchable-dropdown-modal .option {
  font-size: 20;
}
</style>
