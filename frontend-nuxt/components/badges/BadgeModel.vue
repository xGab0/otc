<script setup lang="ts">
interface Props {
    name: string,
}

defineProps<Props>();
</script>

<template>
  <div class="badge">
    <span>{{name}}</span>
  </div>
</template>

<style lang="scss" scoped>
.badge {
  width: fit-content;

  padding-top: 4px;
  padding-left: 8px;
  padding-right: 8px;
  padding-bottom: 4px;

  border-radius: 12px;

  display: flex;
  align-items: center;
  gap: 6px;
  background-color: rgb(255, 240, 240);

  span {
    font-size: 13px;
    font-weight: 500;
    color: darkred
  }
}
</style>
