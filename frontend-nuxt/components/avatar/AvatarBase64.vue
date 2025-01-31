<script setup lang="ts">
interface Props {
  size?: string,
  color?: string,
  name?: string,
  imageBase64: string
}

const {
  size = '16px',
  color = 'rgb(255, 255, 195)',
  name = 'placeholder',
  imageBase64
} = defineProps<Props>();

</script>

<template>
  <img v-if="imageBase64"
    :src="`data:image/png;base64,${imageBase64}`"
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