<script setup lang="ts">
const { size, color, name } = defineProps<{size: string, color: string, name: string}>();
</script>

<template>
  <div class="avatar-dummy" :style="{ width: size, height: size, backgroundColor: color }"/>
</template>

<style lang="scss" scoped>
.avatar-dummy {
  width: 16px;
  height: 16px;
  background-color: rgb(255, 255, 195);
  border-radius: 100%;
}
</style>