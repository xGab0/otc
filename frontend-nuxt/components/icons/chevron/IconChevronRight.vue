<script setup lang="ts">
interface Props {
  width?: number,
  height?: number
}

const { width, height } = defineProps<Props>();
</script>

<template>
  <svg
    :width
    :height
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M10.5858 6.34317L12 4.92896L19.0711 12L12 19.0711L10.5858 17.6569L16.2427 12L10.5858 6.34317Z"
      fill="currentColor"
    />
  </svg>
</template>