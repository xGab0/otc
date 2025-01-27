<script setup lang="ts">
const { title } = defineProps<{ title: string }>();
</script>

<template>
  <div class="card">
    <div class="flex justify-between items-center">
      <span class="title">{{ title }}</span>
      <slot name="header"></slot>
    </div>
    <slot name="body"></slot>
  </div>
</template>

<style lang="scss" scoped>
.card {
  width: 100%;
  padding: .575rem .775rem .875rem .775rem;

  display: flex;
  flex-direction: column;
  gap: 8px;

  border-radius: 20px;
  //background-color: white;
  background-color: rgb(242, 242, 242);

  border: solid 1px rgb(234, 234, 234);
  box-shadow: rgba(0, 0, 0, 0.08) 0px 2px 4px 0px;

  .title {
    font-size: 20px;
    font-weight: 500;
    color: rgb(71, 71, 71);
  }
}
</style>