<template>
  <StackLayout class="shelves-page">
    <!-- search bar -->
    <Search v-model="text" :hint="searchHint" />

    <!-- items -->
  </StackLayout>
</template>

<script>
import Search from '@/components/Search.vue';
export default {
  name: 'Shelves',
  components: {
    Search,
  },
  data: () => {
    return {
      text: '',
      searchHint: 'Find your book',
    };
  },
  methods: {},
};
</script>

<style>
.shelves-page .search {
  height: 60;
}
</style>
