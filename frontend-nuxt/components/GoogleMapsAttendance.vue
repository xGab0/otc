<script setup lang="ts">
const checkInLat = ref<number>(45.42072299748633);
const checkInLng = ref<number>(10.403388270817908);
 
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