<script setup lang="ts">
const checkInLat = ref<number>(40.748817);
const checkInLng = ref<number>(-73.985428);

const checkOutLat = ref<number>(0);
const checkOutLng = ref<number>(0);

const googleUrl = computed(() => {
  return `https://www.google.com/maps?q=${checkInLat.value},${checkInLng.value}&z=15&output=embed`;
});
</script>

<template>
  <div>
    <iframe
      v-if="checkInLat && checkInLng"
      :src="googleUrl"
      width="600"
      height="450"
      frameborder="0"
      style="border:0;"
      allowfullscreen="false"
      aria-hidden="false"
      tabindex="0"
    ></iframe>
  </div>
</template>

<style scoped lang="scss">
iframe {
  border-radius: 8px;
}
</style>