<script setup lang="ts">
const { title } = defineProps<{ title: string }>();
</script>

<template>
  <div class="card">
    <span class="title">{{ title }}</span>
    <slot/>
  </div>
</template>

<style lang="scss" scoped>
.card {
  padding: 12px 24px 16px 24px;

  display: flex;
  flex-direction: column;
  gap: 8px;

  border-radius: 24px;
  background-color: white;

  .title {
    font-size: 30px;
    font-weight: 500;
  }
}
</style>