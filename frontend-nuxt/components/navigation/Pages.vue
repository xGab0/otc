<script setup lang="ts">
import { defineProps } from 'vue';

const { pages, selectedPage } = defineProps({
  pages: { type: Array, required: true },
  selectedPage: { type: Number, required: true }
});
</script>

<template>
  <div class="pages">
    <div
      v-for="(page, index) in pages"
      :key="index"
      :class="{ active: selectedPage === index }"
      class="page"
    >
      <slot :name="`page-${index}`" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.pages {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.page {
  display: none;
  padding: 20px;
  background-color: lightgray;
}

.page.active {
  display: block;
}
</style>
