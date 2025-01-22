<script setup lang="ts">
const { size, color, name, imageBase64 } = defineProps<{
  size: string,
  color: string,
  name: string,
  imageBase64: string
}>();

</script>

<template>
  <img v-if="imageBase64"
    :src="`data:image/png;base64,${imageBase64}`"
    alt=""
    class="avatar-dummy"
    :style="{ width: size, height: size, backgroundColor: color }"
  />
</template>

<style lang="scss" scoped>
.avatar-dummy {
  width: 16px;
  height: 16px;
  background-color: rgb(255, 255, 195);
  border-radius: 100%;
}
</style>