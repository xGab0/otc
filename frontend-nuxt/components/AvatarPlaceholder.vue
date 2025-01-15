<script setup lang="ts">
const { name } = defineProps<{name: string}>();
</script>

<template>
  <div class="avatar-placeholder">
    <span>{{ name[0] }}</span>
  </div>
</template>

<style lang="scss" scoped>
.avatar-placeholder {
  width: 42px;
  height: 42px;
  background-color: rgb(255, 237, 133);
  border-radius: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  span {
    font-size: 26px;
    font-weight: 700;

    color: rgb(224, 172, 16);
  }
}
</style>